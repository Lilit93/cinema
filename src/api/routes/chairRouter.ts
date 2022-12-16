import { Router } from 'express';
import ChairsController from '../controllers/controller_chairs';
const chairsController = new ChairsController();
const chairRouter = Router();
import validationCheck from '../validator/validationCheck';

chairRouter.post('/add/:id',validationCheck("addChairSchema"), chairsController.addChair);
chairRouter.get('/getAll', chairsController.getAll);
chairRouter.get('/findChair/:id',validationCheck("findByIdSchema"), chairsController.findById);
chairRouter.delete('/:id',validationCheck("deleteChairSchema"), chairsController.deleteChair);

export default chairRouter;
