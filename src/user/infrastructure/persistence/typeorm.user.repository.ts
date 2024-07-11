// src/user/infrastructure/repositories/TypeORMUserRepository.ts
import { MongoRepository } from 'typeorm';
import { AppDataSource } from '../../../config/app-data-source';
import { User } from '../../domain/user';
import { UserRepository } from '../../domain/user.repository';
import { UserEntity } from './user.entity';
import { UserDomainPersistenceMapper } from '../mappers/user.domain-persistence.mapper';

export class TypeORMUserRepository implements UserRepository {
  private readonly repository: MongoRepository<UserEntity>;

  constructor() {
    this.repository = AppDataSource.getMongoRepository(UserEntity);
  }

  private mapPersistenceToDomain(entity: UserEntity): User {
    return UserDomainPersistenceMapper.fromPersistenceToDomain(entity);
  }

  async findById(id: string): Promise<User | undefined> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.mapPersistenceToDomain(entity) : undefined;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    const entity = await this.repository.findOne({ where: { username } });
    return entity ? this.mapPersistenceToDomain(entity) : undefined;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const entity = await this.repository.findOne({ where: { email } });
    return entity ? this.mapPersistenceToDomain(entity) : undefined;
  }

  async findAll(): Promise<User[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => this.mapPersistenceToDomain(entity));
  }

  async save(user: User): Promise<User> {
    const entity = await this.repository.save(user);
    return this.mapPersistenceToDomain(entity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
