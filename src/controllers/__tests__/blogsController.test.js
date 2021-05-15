import request from 'supertest';
import  mongoose from "mongoose";
import  app from '../../server.js';
import { MongoMemoryServer } from "mongodb-memory-server";


describe('Test BlogsController', () => {
let mongoServer;
  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const URI = await mongoServer.getUri();

    mongoose.connect(URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

  });

  afterAll(async done => {
    mongoose.disconnect(done);
    await mongoServer.stop();

  });
describe('Test getAllBlogs function error', () => {

      it('Should return blogs if they dont exist', async () => {
       const response = await request(app)
      .get('/api/v1/blogs');
      
      expect(response.status).toBe(200);
      expect(response.body.message).toBe('No Blogs found at the moment.');
      });

 });

describe('Test Blog creation function', () => {
      it('Should create a new blog ', async () => {
       const response = await request(app)
      .post('/api/v1/blogs')
      .send({
       title:"MERN STACK",
       body:`Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      });
      expect(response.status).toBe(201);
      expect(response.body.status).toBe("success");
      });

      it('Should return an erro if block with the same title exist', async () => {
       const response = await request(app)
      .post('/api/v1/blogs')
      .send({
       title:"MERN STACK",
       body:`Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
              when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      });
      expect(response.status).toBe(409);
      expect(response.body.status).toBe("error");
      });

 });


 describe('Test getAllBlogs function', () => {
      it('Should return blogs if they exist', async () => {
       const response = await request(app)
      .get('/api/v1/blogs');
      expect(response.status).toBe(200);
      expect(response.body.blogs.length).toBe(1);
      });

 });

 describe('Test getBlogById', () => {
   let id;
   beforeAll(async () => {
    const res = await request(app)
    .get('/api/v1/blogs');
    id = res.body.blogs[0]._id;
   });
   it('Should return a blog with the supplied id', async () => {
    const response = await request(app)
    .get(`/api/v1/blogs/${id}`);
    expect(response.status).toBe(200);
    expect(response.body.blog.title).toBe('MERN STACK');
   });

   it('Should return an error if blog is not found', async () => {
    const response = await request(app)
    .get('/api/v1/blogs/60462caba2fd5b5989589a97');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Sorry! The requested article was not found.');
   });

  
 })

});
