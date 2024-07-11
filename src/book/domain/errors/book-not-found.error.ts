export class BookNotFoundError extends Error {
  constructor(message = 'Book not found') {
    super(message);
  }
}
