import { Router } from 'express';
import  path from 'path';
import FilmsController from '../controllers/controller_films'
const filmsController = new FilmsController();
import validationCheck from '../validator/validationCheck'

const filmRouter = Router();

filmRouter.put('/update/:id', validationCheck("updateFilmSchema"), filmsController.updateFilm);
filmRouter.post('/add', validationCheck("addFilmSchema"), filmsController.addFilm);
filmRouter.get('/all', filmsController.getAll);
filmRouter.delete('/:id',validationCheck("deleteFilmSchema"), filmsController.deleteFilm)


export default filmRouter;