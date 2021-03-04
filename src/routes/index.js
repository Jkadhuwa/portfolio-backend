import express from 'express';
import userRouter from './usersRouter.js';
import {userLogin} from '../controllers/userController.js'
import Validator from '../middlewares/validation.js'

const router = express();

router.get('/', (req, res) => {
    return res.status(200).json({message: 'Welcome to Musinda Kadhuwa API'})
});
router.post('/login', Validator.loginValidator, userLogin);
router.use('/users', userRouter);

export default router;