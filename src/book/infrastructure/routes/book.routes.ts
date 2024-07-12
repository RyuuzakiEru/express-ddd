import { Router } from 'express';
import { GetBookByIdController } from '../controller/get-book-by-id.controller';

import { container } from '../../../config/tsyringe.config';
import { ListBooksController } from '../controller/list-books.controller';
import { DeleteBookByIdController } from '../controller/delete-books-by-id.controller';

const booksRouter = Router();

const getBookByIdController = container.resolve(GetBookByIdController);
const listBooksController = container.resolve(ListBooksController);
const deleteBookByIdController = container.resolve(DeleteBookByIdController);

booksRouter.get('/books/:id', (req, res) => getBookByIdController.handle(req, res));
booksRouter.get('/books', (req, res) => listBooksController.handle(req, res));

booksRouter.delete('/books/:id', (req, res) => deleteBookByIdController.handle(req, res));

export { booksRouter };
