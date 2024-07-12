import { injectable, inject } from 'tsyringe';
import { RESERVATION_REPOSITORY } from '../reservation.constants';
import { GetBookByIdService } from '../../book/application/get-book-by-id.service';
import { GetUserByIdService } from '../../user/application/get-user-by-id.service';
import { SaveUserService } from '../../user/application/save-user.service';
import { ReservationRepository } from '../domain/reservation.repository';
import { SaveBookService } from '../../book/application/save-book.service';

@injectable()
export class ReturnReservationService {
  #LATE_FEE_PER_DAY = 0.2;
  #ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
  constructor(
    @inject(RESERVATION_REPOSITORY) private reservationRepository: ReservationRepository,
    private getBookByIdService: GetBookByIdService,
    private getUserByIdService: GetUserByIdService,
    private saveBookService: SaveBookService,
    private saveUserService: SaveUserService,
  ) {}

  async returnReservation(reservationId: string): Promise<void> {
    const reservation = await this.reservationRepository.findById(reservationId);
    if (!reservation) {
      throw new Error('Reservation not found');
    }
    const user = await this.getUserByIdService.execute(reservation.userId.toString());
    const book = await this.getBookByIdService.execute(reservation.bookId.toString());

    const currentDate = new Date();
    if (reservation.dueDate < currentDate && !reservation.returnedAt) {
      const daysLate = Math.ceil(
        (currentDate.getTime() - reservation.dueDate.getTime()) / this.#ONE_DAY_IN_MS,
      );
      const lateFee = daysLate * this.#LATE_FEE_PER_DAY;
      if (lateFee >= book.price) {
        user.deductFromWallet(book.price);
      } else {
        user.deductFromWallet(lateFee);
      }
    }

    book.updateCopiesAvailable(book.copiesAvailable + 1);
    reservation.returnedAt = currentDate;

    await this.saveUserService.execute(user);
    await this.saveBookService.execute(book);
    await this.reservationRepository.save(reservation);
  }
}
