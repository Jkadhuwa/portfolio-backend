import express from 'express';
import {addNewBlog, getAllBlogs} from '../controllers/blogController.js'
import Validator from '../middlewares/validation.js'

const blogRouter = express.Router();

blogRouter.get('/',  getAllBlogs);
blogRouter.post('/', Validator.createBlogValidator, addNewBlog);

export default blogRouter;