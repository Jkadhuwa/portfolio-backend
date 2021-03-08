import request from 'supertest';
import  app from '../../server.js';


describe('Validation tests', () => {
    describe('Test userLogin validation', () => {
        it('Should return error if username is not provided', async () => {
      const response = await request(app)
      .post('/api/v1/login')
      .send({
       username:"",
       password:"Uninet41234",
      });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("username is not allowed to be empty");
});
    })


    describe('Test signup Validation ', () => {
    it('Should return error if name is not a string', async () => {
      const response = await request(app)
      .post('/api/v1/users')
      .send({
       username:"Jkadhuwa",
       password:"Uninet41234",
       name:12453
      });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("name must be a string");
});
    });

    describe('Test CreateBlog validation', () => {
      it('Should return an error if title is not provided', async () => {
        const response = await request(app)
      .post('/api/v1/blogs')
      .send({
       title:"",
       body:"here we go again",
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("title is not allowed to be empty");
      });

    it('Should return an error if body is less than 100 characters ', async () => {
        const response = await request(app)
      .post('/api/v1/blogs')
      .send({
       title:"MERN STACK",
       body:"here we go again",
      });
      expect(response.status).toBe(400);
      expect(response.body.error).toBe("body length must be at least 100 characters long");
      });
    });

});