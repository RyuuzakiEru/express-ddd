import { container, delay } from 'tsyringe';
import { GetBookByIdService } from '../book/application/get-book-by-id.service';
import { BOOK_REPOSITORY } from '../book/book.constants';
import { BookRepository } from '../book/domain/book.repository';
import { GetBookByIdController } from '../book/infrastructure/controller/get-book-by-id.controller';
import { TypeORMBookRepository } from '../book/infrastructure/persistence/typeorm.book.repository';
import { ReservationRepository } from '../reservation/domain/reservation.repository';
import { TypeORMReservationRepository } from '../reservation/infrastructure/persistence/typeorm.reservation.repository';
import { RESERVATION_REPOSITORY } from '../reservation/reservation.constants';
import { UserRepository } from '../user/domain/user.repository';
import { TypeORMUserRepository } from '../user/infrastructure/persistence/typeorm.user.repository';
import { USER_REPOSITORY } from '../user/user.constants';
import { FindBooksService } from '../book/application/find-books-by-criteria.service';
import { ListBooksController } from '../book/infrastructure/controller/list-books.controller';
import { DeleteBookByIdService } from '../book/application/delete-book-by-id.service';
import { CreateReservationService } from '../reservation/application/create-reservation.service';
import { CreateReservationController } from '../reservation/infrastructure/controller/create-reservation.controller';
import { SendEmailService } from '../notifications/application/send-email.service';
import { GetUserByIdService } from '../user/application/get-user-by-id.service';
import { SaveUserService } from '../user/application/save-user.service';
import { ReturnReservationService } from '../reservation/application/return-reservation.service';
import { ReturnReservationController } from '../reservation/infrastructure/controller/return-reservation.controller';

container.register<BookRepository>(BOOK_REPOSITORY, {
  useClass: delay(() => TypeORMBookRepository),
});
container.register<UserRepository>(USER_REPOSITORY, {
  useClass: TypeORMUserRepository,
});
container.register<ReservationRepository>(RESERVATION_REPOSITORY, {
  useClass: TypeORMReservationRepository,
});

container.register(GetBookByIdService, {
  useClass: GetBookByIdService,
});
container.register(GetBookByIdController, {
  useClass: GetBookByIdController,
});

container.register(FindBooksService, {
  useClass: FindBooksService,
});
container.register(ListBooksController, {
  useClass: ListBooksController,
});

container.register(DeleteBookByIdService, {
  useClass: DeleteBookByIdService,
});
container.register(ListBooksController, {
  useClass: ListBooksController,
});

container.register(CreateReservationService, {
  useClass: CreateReservationService,
});
container.register(CreateReservationController, {
  useClass: CreateReservationController,
});

container.register(ReturnReservationService, { useClass: ReturnReservationService });

container.register(ReturnReservationController, { useClass: ReturnReservationController });

container.register(GetUserByIdService, {
  useClass: GetUserByIdService,
});
container.register(SaveUserService, {
  useClass: SaveUserService,
});

container.register(SendEmailService, {
  useClass: SendEmailService,
});

export { container };
