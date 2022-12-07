import { Router } from 'express';
import  path from 'path';
import HallsController from '../controllers/controller_halls'
const hallsController = new HallsController();
import validationCheck from '../validator/validationCheck';

const hallRouter = Router();
hallRouter.post('/addHall',validationCheck("addHallSchema"), hallsController.addHall);
hallRouter.put('/update/:id',validationCheck("updateHallSchema"), hallsController.updateHall)
hallRouter.get('/all', hallsController.getAll)
hallRouter.delete('/:id',validationCheck("deleteHallSchema"), hallsController.deleteHall)

export default  hallRouter
