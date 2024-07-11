import 'reflect-metadata';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { AppDataSource } from '../config/app-data-source';
import { BookEntity } from '../book/infrastructure/persistence/book.entity';
import { exit } from 'process';

async function importBooks() {
  await AppDataSource.initialize();
  const bookRepository = AppDataSource.getMongoRepository(BookEntity);

  const parser = createReadStream('src/scripts/books_sample.csv').pipe(parse({ columns: true }));

  for await (const record of parser) {
    const book = new BookEntity();
    book.id = record.id;
    book.title = record.title;
    book.author = record.author;
    book.publicationYear = record.publication_year;
    book.publisher = record.publisher;
    book.price = +record.price;
    book.copiesAvailable = 4;

    await bookRepository.save(book);
  }

  console.log('Books imported successfully');
  exit(0);
}

importBooks().catch((error) => console.error('Error importing books:', error));
