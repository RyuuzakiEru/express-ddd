import { inject, injectable } from 'tsyringe';
import { ObjectId } from 'mongodb';
import { ReservationRepository } from '../domain/reservation.repository';
import { BookRepository } from '../../book/domain/book.repository';
import { RESERVATION_REPOSITORY } from '../reservation.constants';
import { BOOK_REPOSITORY } from '../../book/book.constants';
import { UserRepository } from '../../user/domain/user.repository';
import { USER_REPOSITORY } from '../../user/user.constants';
import { BookNotFoundError } from '../../book/domain/errors/book-not-found.error';
import { Reservation } from '../domain/reservation';

@injectable()
export class CreateReservationService {
  #RESERVATION_COST = 3;
  #MAX_ACTIVE_RESERVATIONS = 3;
  #DEFAULT_RESERVATION_PERIOD_DAYS = 7;
  constructor(
    @inject(RESERVATION_REPOSITORY) private reservationRepository: ReservationRepository,
    @inject(BOOK_REPOSITORY) private bookRepository: BookRepository,
    @inject(USER_REPOSITORY) private userRepository: UserRepository,
  ) {}

  async execute(userId: string, bookId: string): Promise<Reservation> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const book = await this.bookRepository.findById(bookId);
    if (!book) {
      throw new BookNotFoundError('Book not found');
    }

    if (book.copiesAvailable <= 0) {
      throw new Error('No copies available');
    }

    const activeReservations =
      await this.reservationRepository.countActiveReservationsByUserId(userId);
    if (activeReservations >= this.#MAX_ACTIVE_RESERVATIONS) {
      throw new Error('User cannot borrow more than 3 books');
    }

    const reservedAt = new Date();
    const dueDate = new Date(reservedAt.getTime());
    dueDate.setDate(reservedAt.getDate() + this.#DEFAULT_RESERVATION_PERIOD_DAYS);
    const reservation = Reservation.create(
      new ObjectId(userId),
      new ObjectId(bookId),
      reservedAt,
      dueDate,
      this.#RESERVATION_COST,
    );

    await this.reservationRepository.save(reservation);
    book.updateCopiesAvailable(book.copiesAvailable - 1);

    await this.bookRepository.save(book);

    return reservation;
  }
}
