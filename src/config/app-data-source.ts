import { DataSource } from 'typeorm';
import { BookEntity } from '../book/infrastructure/persistence/book.entity';
import { ReservationEntity } from '../reservation/infrastructure/persistence/reservation.entity';
import { UserEntity } from '../user/infrastructure/persistence/user.entity';

export const AppDataSource: DataSource = new DataSource({
  type: 'mongodb',
  host: process.env.DB_HOST!,
  port: +process.env.DB_PORT!,
  database: 'library',
  synchronize: false,
  useUnifiedTopology: true,
  entities: [BookEntity, UserEntity, ReservationEntity],
});
