import { Mapper } from '../../../shared/mapper';
import { Reservation } from '../../domain/reservation';
import { ReservationEntity } from '../persistence/reservation.entity';

export const ReservationDomainPersistenceMapper = {
  fromPersistenceToDomain: Mapper<ReservationEntity, Reservation>(
    (entity) => new Reservation(
      entity.id,
      entity.userId,
      entity.bookId,
      entity.reservedAt,
      entity.dueDate,
      entity.cost,
      entity.returnedAt
    ),
  ),
};
