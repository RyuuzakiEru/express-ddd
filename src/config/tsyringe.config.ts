import { container } from 'tsyringe';
import { BookRepository } from '../book/domain/book.repository';
import { TypeORMBookRepository } from '../book/infrastructure/persistence/typeorm.book.repository';
import { ReservationRepository } from '../reservation/domain/reservation.repository';
import { TypeORMReservationRepository } from '../reservation/infrastructure/persistence/typeorm.reservation.repository';
import { UserRepository } from '../user/domain/user.repository';
import { TypeORMUserRepository } from '../user/infrastructure/persistence/typeorm.user.repository';
import { BOOK_REPOSITORY } from '../book/book.constants';
import { RESERVATION_REPOSITORY } from '../reservation/reservation.constants';
import { USER_REPOSITORY } from '../user/user.constants';

container.register<BookRepository>(BOOK_REPOSITORY, {
  useClass: TypeORMBookRepository,
});
container.register<UserRepository>(USER_REPOSITORY, {
  useClass: TypeORMUserRepository,
});
container.register<ReservationRepository>(RESERVATION_REPOSITORY, {
  useClass: TypeORMReservationRepository,
});

export { container };
