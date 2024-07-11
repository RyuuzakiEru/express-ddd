import { Entity, ObjectIdColumn, Column, Index } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
@Index('book_author_index', { synchronize: false })
@Index('book_title_index', { synchronize: false })
@Index('book_publisher_index', { synchronize: false })
export class BookEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publicationYear: number;

  @Column()
  publisher: string;

  @Column()
  price: number;

  @Column()
  copiesAvailable: number;
}
