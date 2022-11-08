import { Router } from 'express';
import  path from 'path';
import HallsController from '../controllers/controller_halls'
const hallsController = new HallsController();

const hallRouter = Router();
hallRouter.post('/addHall', hallsController.addHall)

export default  hallRouter
