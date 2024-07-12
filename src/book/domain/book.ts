import { ObjectId } from 'typeorm';

export class Book {
  id: ObjectId;
  title: string;
  author: string;
  publicationYear: number;
  publisher: string;
  price: number;
  copiesAvailable: number;

  constructor(
    id: ObjectId,
    title: string,
    author: string,
    publicationYear: number,
    publisher: string,
    price: number,
    copiesAvailable: number,
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.publicationYear = publicationYear;
    this.publisher = publisher;
    this.price = price;
    this.copiesAvailable = copiesAvailable;
  }

  static create(
    title: string,
    author: string,
    publicationYear: number,
    publisher: string,
    price: number,
    copiesAvailable: number,
  ): Book {
    return new Book(
      ObjectId.createFromTime(Date.now()),
      title,
      author,
      publicationYear,
      publisher,
      price,
      copiesAvailable,
    );
  }

  updateCopiesAvailable(copies: number) {
    if (copies < 0) {
      throw new Error('Available Copies cannot be less than 0');
    }
    this.copiesAvailable = copies;
  }
}
