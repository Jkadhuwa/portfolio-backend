import Blog from '../models/blog.model.js';

class BlogService{
    async createBlog(payload){
        const { title,body, comment } = payload;
        const blog = await Blog.findOne({title});
        if(!blog){
    try {
    const newBlog = new Blog({title, body, comment});
    return  newBlog.save();
    } catch (error) {
       return  error;
    }
  } 
  return false;

 }

 async findAllBlogs(){
   return await Blog.find();
 }

 async getBlogById (id) {
   try {
    return await Blog.findById(id); 
   } catch (error) {
     return false
   }
   
}
}
export const blogService = new BlogService();
