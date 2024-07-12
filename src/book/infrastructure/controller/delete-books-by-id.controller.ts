// src/book/application/SearchBooksController.ts
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import { DeleteBookByIdService } from '../../application/delete-book-by-id.service';
import { BookNotFoundError } from '../../domain/errors/book-not-found.error';

@injectable()
export class DeleteBookByIdController {
  constructor(
    @inject(DeleteBookByIdService) private readonly deleteBookByIdService: DeleteBookByIdService
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      const book = await this.deleteBookByIdService.execute(id);
      return res.json(book);
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof BookNotFoundError) {
        return res.status(404).json({ message: error.message });
      }

      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
