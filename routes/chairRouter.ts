import { Router } from 'express';
import  path from 'path';
import ChairsController from '../controllers/controller_chairs'
const chairsController = new ChairsController();
const chairRouter = Router();

chairRouter.post('/add/:id', chairsController.addChair);
chairRouter.delete('/:id', chairsController.deleteChair);
chairRouter.get('/getAll', chairsController.getAll);
chairRouter.get('/findChair/:id', chairsController.findById)
export default chairRouter;