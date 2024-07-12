import { MongoRepository } from 'typeorm';
import { AppDataSource } from '../../../config/app-data-source';
import { ReservationRepository } from '../../domain/reservation.repository';
import { ReservationEntity } from './reservation.entity';
import { Reservation } from '../../domain/reservation';
import { ReservationDomainPersistenceMapper } from '../mappers/reservation.domain-persistence.mapper';

export class TypeORMReservationRepository implements ReservationRepository {
  private readonly repository: MongoRepository<ReservationEntity>;

  constructor() {
    this.repository = AppDataSource.getMongoRepository(ReservationEntity);
  }

  private mapPersistenceToDomain(entity: ReservationEntity): Reservation {
    return ReservationDomainPersistenceMapper.fromPersistenceToDomain(entity);
  }

  async findById(id: string): Promise<Reservation | undefined> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.mapPersistenceToDomain(entity) : undefined;
  }

  async findByUserId(userId: string): Promise<Reservation[]> {
    const entities = await this.repository.find({ where: { userId } });
    return entities.map((entity) => this.mapPersistenceToDomain(entity));
  }

  async findByBookId(bookId: string): Promise<Reservation[]> {
    const entities = await this.repository.find({ where: { bookId } });
    return entities.map((entity) => this.mapPersistenceToDomain(entity));
  }

  async save(reservation: Reservation): Promise<Reservation> {
    const entity = await this.repository.save(reservation);
    return this.mapPersistenceToDomain(entity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findReservationsByDueDate(dueDate: Date, daysOffset: number): Promise<Reservation[]> {
    const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
    const endDate = new Date(dueDate.getTime() + daysOffset * ONE_DAY_IN_MS);
    const entities = await this.repository.find({
      where: {
        dueDate: {
          $gte: dueDate,
          $lt: endDate,
        },
        returnedAt: null,
      },
    });
    return entities.map((entity) => this.mapPersistenceToDomain(entity));
  }

  async countActiveReservationsByUserId(userId: string): Promise<number> {
    return await this.repository.count({ where: { userId, returnedAt: null } });
  }

  async countActiveReservationsByBookId(bookId: string): Promise<number> {
    return await this.repository.count({ where: { bookId, returnedAt: null } });
  }
}
