import express from 'express';
import {createUser} from '../controllers/userController.js'
import Validator from '../middlewares/validation.js'

const userRouter = express.Router();

userRouter.post('/', Validator.signupValidator, createUser);

export default userRouter;