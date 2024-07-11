import { Book } from './book';

export interface BookRepository {
  findById(id: string): Promise<Book | undefined>;
  findByCriteria(criteria: Partial<Book>): Promise<Book[]>;
  findAll(): Promise<Book[]>;
  save(book: Book): Promise<Book>;
  delete(id: string): Promise<void>;
}
