import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { CreateReservationService } from '../../application/create-reservation.service';

@injectable()
class CreateReservationController {
  constructor(private readonly createReservationService: CreateReservationService) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { userId, bookId } = req.body;
    try {
      const reservation = await this.createReservationService.execute(
        userId,
        bookId,
      );
      return res.status(201).json(reservation);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

export { CreateReservationController };
