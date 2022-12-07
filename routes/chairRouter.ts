import { Router } from 'express';
import  path from 'path';
import ChairsController from '../controllers/controller_chairs'
const chairsController = new ChairsController();
const chairRouter = Router();
import validationCheck from '../validator/validationCheck'

chairRouter.post('/add/:id',validationCheck("addChairSchema"), chairsController.addChair);
chairRouter.delete('/:id',validationCheck("deleteChairSchema"), chairsController.deleteChair);
chairRouter.get('/getAll', chairsController.getAll);
chairRouter.get('/findChair/:id',validationCheck("findByIdSchema"), chairsController.findById)
export default chairRouter;