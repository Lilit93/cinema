import { Router } from 'express';
import ServerController from '../controllers/controller_server'
const serverController = new ServerController()
const serverRouter = Router();

serverRouter.get('/api/server', serverController.getAll);
// router.get('/api/create', serverController.c);
// router.delete('/api/delete', remove)

export default  serverRouter
