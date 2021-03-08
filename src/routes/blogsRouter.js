import express from 'express';
import {addNewBlog} from '../controllers/blogController.js'
import Validator from '../middlewares/validation.js'

const blogRouter = express.Router();

blogRouter.post('/', Validator.createBlogValidator, addNewBlog);

export default blogRouter;