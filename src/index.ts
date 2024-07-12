import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './config/app-data-source';
import { booksRouter } from './book/infrastructure/routes/book.routes';
import { reservationsRouter } from './reservation/infrastructure/routes/reservation.routes';
import { scheduleNotificationReminders } from './notifications/infrastructure/notification-reminder.cron';

const API_VERSION = '/v1';
AppDataSource.initialize()
  .then(() => {
    console.log('Datasource Initialized');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

const app = express();

app.use(express.json());

app.use(API_VERSION, booksRouter);
app.use(API_VERSION, reservationsRouter);

scheduleNotificationReminders();

const PORT = process.env.PORT;
app
  .listen(PORT, () => {
    console.log('Server running at PORT: ', PORT);
  })
  .on('error', (error) => {
    throw new Error(error.message);
  });
