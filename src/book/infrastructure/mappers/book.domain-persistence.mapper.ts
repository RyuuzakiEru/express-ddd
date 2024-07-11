import { Mapper } from '../../../shared/mapper';
import { Book } from '../../domain/book';
import { BookEntity } from '../persistence/book.entity';

export const BookDomainPersistenceMapper = {
  fromPersistenceToDomain: Mapper<BookEntity, Book>(
    (entity) =>
      new Book(
        entity.id,
        entity.title,
        entity.author,
        entity.publicationYear,
        entity.publisher,
        entity.price,
        entity.copiesAvailable,
      ),
  ),
};
