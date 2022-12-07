import { Router } from 'express';
import  path from 'path';
import ReservationController from '../controllers/controller_reservations'
const reservationController = new ReservationController();
const reservationRouter = Router();
import tokenCheck from "../authorization/tokenCheck"
import validationCheck from '../validator/validationCheck';

reservationRouter.post('/add', tokenCheck,validationCheck("addReservationSchema"), reservationController.addReservation);
reservationRouter.put('/update/:id', tokenCheck,validationCheck("updateReservationSchema"), reservationController.updateReservation)
reservationRouter.get('/all', tokenCheck, reservationController.getAll)
reservationRouter.delete('/:id', tokenCheck,validationCheck("deleteReservationSchema"), reservationController.deleteReservation)
reservationRouter.get('/getFilmReservations/:id',validationCheck("getReservationsByFilmIdSchema"), tokenCheck, reservationController.getReservationsByFilmId)

export default  reservationRouter