import { ObjectId } from 'mongodb';

export class Reservation {
  id: ObjectId;
  userId: ObjectId;
  bookId: ObjectId;
  reservedAt: Date;
  dueDate: Date;
  cost: number;
  returnedAt?: Date;

  constructor(
    id: ObjectId,
    userId: ObjectId,
    bookId: ObjectId,
    reservedAt: Date,
    dueDate: Date,
    cost: number,
    returnedAt?: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.bookId = bookId;
    this.reservedAt = reservedAt;
    this.dueDate = dueDate;
    this.cost = cost;
    this.returnedAt = returnedAt;
  }

  static create(
    userId: ObjectId,
    bookId: ObjectId,
    reservedAt: Date,
    dueDate: Date,
    cost: number,
    returnedAt?: Date,
  ) {
    return new Reservation(
      ObjectId.createFromTime(Date.now()),
      userId,
      bookId,
      reservedAt,
      dueDate,
      cost,
      returnedAt,
    );
  }
}
