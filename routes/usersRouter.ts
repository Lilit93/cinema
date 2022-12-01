import { Router } from 'express';
import  path from 'path';
import UsersController from '../controllers/controller_users'
const usersController = new UsersController();
const userRouter = Router();

userRouter.post('/sign-up', usersController.signUp);
userRouter.post('/sign-in', usersController.signIn)

export default userRouter;