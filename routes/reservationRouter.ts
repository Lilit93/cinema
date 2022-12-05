import { Router } from 'express';
import  path from 'path';
import ReservationController from '../controllers/controller_reservations'
const reservationController = new ReservationController();
const reservationRouter = Router();
import tokenCheck from "../authorization/tokenCheck"

reservationRouter.post('/add', tokenCheck, reservationController.addReservation);
reservationRouter.put('/update/:id', tokenCheck, reservationController.updateReservation)
reservationRouter.get('/all', tokenCheck, reservationController.getAll)
reservationRouter.delete('/:id', tokenCheck, reservationController.deleteReservation)
reservationRouter.get('/getFilmReservations/:id', tokenCheck, reservationController.getReservationsByFilmId)

export default  reservationRouter