// src/book/application/SearchBooksController.ts
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { FindBooksQuery, FindBooksService } from '../../application/find-books-by-criteria.service';

@injectable()
export class ListBooksController {
  constructor(
    @inject(FindBooksService) private readonly searchBooksService: FindBooksService
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const criteria: FindBooksQuery = {
      publisher: req.query.publisher ? String(req.query.publisher) : undefined,
      title: req.query.title ? String(req.query.title) : undefined,
      author: req.query.author ? String(req.query.author) : undefined,
    };

    try {
      const books = await this.searchBooksService.execute(criteria);
      return res.json(books);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to search books' });
    }
  }
}
