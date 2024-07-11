import { Mapper } from '../../../shared/mapper';
import { User } from '../../domain/user';
import { UserEntity } from '../persistence/user.entity';

export const UserDomainPersistenceMapper = {
  fromPersistenceToDomain: Mapper<UserEntity, User>(
    (entity) => new User(entity.id, entity.name, entity.email, entity.wallet),
  ),
};
