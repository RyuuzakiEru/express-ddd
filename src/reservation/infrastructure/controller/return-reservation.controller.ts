import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { ReturnReservationService } from '../../application/return-reservation.service';

@injectable()
class ReturnReservationController {
  constructor(private readonly returnReservationService: ReturnReservationService) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    try {
      await this.returnReservationService.returnReservation(id);
      return res.status(200).json({ message: 'Reservation returned successfully' });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Failed to return reservation', error: error.message });
    }
  }
}

export { ReturnReservationController };
