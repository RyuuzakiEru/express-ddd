import { injectable, inject } from 'tsyringe';
import { BookRepository } from '../domain/book.repository';
import { BOOK_REPOSITORY } from '../book.constants';
import { Book } from '../domain/book';

export type FindBooksQuery = {
  title?: string;
  author?: string;
  publisher?: string;
};

@injectable()
export class FindBooksService {
  constructor(@inject(BOOK_REPOSITORY) private readonly bookRepository: BookRepository) {}

  async execute(criteria: FindBooksQuery): Promise<Book[]> {
    return await this.bookRepository.findByCriteria(criteria);
  }
}
