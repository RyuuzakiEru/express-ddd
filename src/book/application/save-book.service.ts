import { injectable, inject } from 'tsyringe';
import { BookRepository } from '../domain/book.repository';
import { Book } from '../domain/book';
import { BOOK_REPOSITORY } from '../book.constants';

@injectable()
export class SaveBookService {
  constructor(@inject(BOOK_REPOSITORY) private readonly bookRepository: BookRepository) {}

  async execute(book: Book): Promise<void> {
    await this.bookRepository.save(book);
  }
}
