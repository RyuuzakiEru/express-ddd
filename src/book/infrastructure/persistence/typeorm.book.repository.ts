import { MongoRepository } from 'typeorm';
import { AppDataSource } from '../../../config/app-data-source';
import { Book } from '../../domain/book';
import { BookRepository } from '../../domain/book.repository';
import { BookEntity } from './book.entity';
import { BookDomainPersistenceMapper } from '../mappers/book.domain-persistence.mapper';

export class TypeORMBookRepository implements BookRepository {
  private readonly repository: MongoRepository<BookEntity>;

  constructor() {
    this.repository = AppDataSource.getMongoRepository(BookEntity);
  }

  private mapPersistenceToDomain(entity: BookEntity): Book {
    return BookDomainPersistenceMapper.fromPersistenceToDomain(entity);
  }

  async findById(id: string): Promise<Book | undefined> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? this.mapPersistenceToDomain(entity) : undefined;
  }

  async findByCriteria(criteria: Partial<Book>): Promise<Book[]> {
    const { publisher, title, author } = criteria;
    let findOptions: Partial<BookEntity> = {};

    if (publisher) {
      findOptions = { ...findOptions, publisher };
    }
    if (title) {
      findOptions = { ...findOptions, title };
    }
    if (author) {
      findOptions = { ...findOptions, author };
    }

    const entities = await this.repository.find(findOptions);
    return entities.map((entity) => this.mapPersistenceToDomain(entity));
  }

  async findAll(): Promise<Book[]> {
    const entities = await this.repository.find();
    return entities.map((entity) => this.mapPersistenceToDomain(entity));
  }

  async save(book: Book): Promise<Book> {
    const entity = await this.repository.save(book);
    return this.mapPersistenceToDomain(entity);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
