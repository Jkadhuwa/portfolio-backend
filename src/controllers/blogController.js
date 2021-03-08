import { blogService } from '../services/blogService.js';

export const addNewBlog = async(req, res) => {
    const blog = await blogService.createBlog(req.body);
     if(!blog){
        return res.status(409).json({status: 'error', message: `Blog with the same title: ${req.body.title} already exisit.`});
    }
    return res.status(201).json({
        status: "success",
        message: 'Blog created successfully',
        blog
    })
}

export const getAllBlogs = async(req, res) => {
    const blogs = await blogService.findAllBlogs();
    if(!blogs.length){
         return res.status(200).json({status: 'success', message: "No Blogs found at the moment."});
    }

    return res.status(200).json({
        status: "success",
        blogs
    });
};
