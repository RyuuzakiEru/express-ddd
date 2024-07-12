import { Reservation } from './reservation';

export interface ReservationRepository {
  findById(id: string): Promise<Reservation | undefined>;
  findByUserId(userId: string): Promise<Reservation[]>;
  findByBookId(bookId: string): Promise<Reservation[]>;
  findReservationsByDueDate(dueDate: Date, daysOffset: number): Promise<Reservation[]>
  save(reservation: Reservation): Promise<Reservation>;
  delete(id: string): Promise<void>;
  countActiveReservationsByUserId(userId: string): Promise<number>;
  countActiveReservationsByBookId(bookId: string): Promise<number>;
}
