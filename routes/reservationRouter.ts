import { Router } from 'express';
import  path from 'path';
import ReservationController from '../controllers/controller_reservations'
const reservationController = new ReservationController();
const reservationRouter = Router();

reservationRouter.post('/add', reservationController.addReservation);
reservationRouter.put('/update/:id', reservationController.updateReservation)
reservationRouter.get('/all', reservationController.getAll);
reservationRouter.get('/findByFilm/:filmId', reservationController.getReservationsByFilmId)
reservationRouter.delete('/:id', reservationController.deleteReservation)

export default  reservationRouter