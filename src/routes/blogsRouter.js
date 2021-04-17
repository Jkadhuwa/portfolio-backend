import express from 'express';
import {addNewBlog, getAllBlogs, getSingleBlog} from '../controllers/blogController.js'
import Validator from '../middlewares/validation.js'

const blogRouter = express.Router();

blogRouter.get('/',  getAllBlogs);
blogRouter.post('/', Validator.createBlogValidator, addNewBlog);
blogRouter.get('/:id', getSingleBlog)

export default blogRouter;