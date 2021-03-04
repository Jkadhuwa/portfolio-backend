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
});