import express, { Request, Response } from 'express';
import { dataSource } from './data-source';

dataSource
  .initialize()
  .then(() => {
    console.log('Datasource Initialized');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

const app = express();

const PORT = process.env.PORT;

app.get('/', (request: Request, response: Response) => {
  response.status(200).send('Hello World');
});

app
  .listen(PORT, () => {
    console.log('Server running at PORT: ', PORT);
  })
  .on('error', (error) => {
    throw new Error(error.message);
  });
