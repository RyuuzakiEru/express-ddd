// src/reservation/infrastructure/repositories/TypeORMReservationRepository.ts
import { MongoRepository } from 'typeorm';
import { AppDataSource } from '../../../config/app-data-source';
import { Reservation } from '../../domain/reservation';
import { ReservationRepository } from '../../domain/reservation.repository';
import { ReservationEntity } from './reservation.entity';
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

  async findByUser(userId: string): Promise<Reservation[]> {
    const entities = await this.repository.find({ where: { user: userId } });
    return entities.map((entity) => this.mapPersistenceToDomain(entity));
  }

  async findByBook(bookId: string): Promise<Reservation[]> {
    const entities = await this.repository.find({ where: { book: bookId } });
    return entities.map((entity) => this.mapPersistenceToDomain(entity));
  }

  async findAll(): Promise<Reservation[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => this.mapPersistenceToDomain(entity));
  }

  async save(reservation: Reservation): Promise<Reservation> {
    const entity = await this.repository.save(reservation);
    return this.mapPersistenceToDomain(entity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
