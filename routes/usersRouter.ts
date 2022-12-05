import { Router } from 'express';
import  path from 'path';
import UsersController from '../controllers/controller_users'
const usersController = new UsersController();
const userRouter = Router();
import validationCheck from '../validator/validationCheck'

userRouter.post('/sign-up', validationCheck('signUpSchema'), usersController.signUp);
userRouter.post('/sign-in', validationCheck('signInSchema'), usersController.signIn)

export default userRouter;