import request from 'supertest';
import  app from '../../server.js';

describe('Base URL Tests', () => {

    it('Should return return a successful message if server and DB is connected', async () => {
       const response = await request(app)
      .get('/api/v1/')
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Welcome to Musinda Kadhuwa API");
    })

     it('Should return an error if a wrong url is provided ', async() => {
        const response = await request(app)
       .get('/')
       expect(response.status).toBe(404);
       expect(response.body.error).toBe("Sorry you have hit an invalid url!!!!");
     })

});