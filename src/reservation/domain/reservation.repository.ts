import { Reservation } from './reservation';

export interface ReservationRepository {
  findById(id: string): Promise<Reservation | undefined>;
  findByUser(userId: string): Promise<Reservation[]>;
  findByBook(bookId: string): Promise<Reservation[]>;
  findAll(): Promise<Reservation[]>;
  save(reservation: Reservation): Promise<Reservation>;
  delete(id: string): Promise<void>;
}
