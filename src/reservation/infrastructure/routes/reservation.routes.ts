import express from 'express';
import { container } from '../../../config/tsyringe.config';
import { CreateReservationController } from '../controller/create-reservation.controller';
import { ReturnReservationController } from '../controller/return-reservation.controller';

const reservationsRouter = express.Router();
const createReservationController = container.resolve(CreateReservationController);
const returnReservationController = container.resolve(ReturnReservationController);

reservationsRouter.post('/reservations', (req, res) => createReservationController.handle(req, res));
reservationsRouter.post('/reservations/:id/return', (req, res) => returnReservationController.handle(req, res));

export { reservationsRouter };
