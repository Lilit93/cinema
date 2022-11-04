import { Router } from 'express';
import  path from 'path';
import FilmsController from '../controllers/controller_films'
const filmsController = new FilmsController();

const filmRouter = Router();

filmRouter.put('/update/:id', filmsController.updateFilm);
filmRouter.post('/add', filmsController.addFilm);
filmRouter.get('/all', filmsController.getAll);
filmRouter.delete('/:id', filmsController.deleteFilm)


export default filmRouter;