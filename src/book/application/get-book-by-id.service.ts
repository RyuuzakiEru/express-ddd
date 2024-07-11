import { injectable, inject } from 'tsyringe';
import { BookRepository } from '../domain/book.repository';
import { BOOK_REPOSITORY } from '../book.constants';
import { Book } from '../domain/book';
import { BookNotFoundError } from '../domain/errors/book-not-found.error';

@injectable()
export class GetBookByIdService {
  constructor(@inject(BOOK_REPOSITORY) private readonly bookRepository: BookRepository) {}

  async execute(id: string): Promise<Book> {
    const book = await this.bookRepository.findById(id);
    if (!book) {
      throw new BookNotFoundError(`Book with id ${id} not found`);
    }
    return book;
  }
}
