import { Entity, ObjectIdColumn, Column } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class ReservationEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  userId: ObjectId;

  @Column()
  bookId: ObjectId;

  @Column()
  reservedAt: Date;
  
  @Column()
  dueDate: Date;

  @Column()
  returnedAt?: Date;
}
