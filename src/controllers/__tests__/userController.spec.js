import request from 'supertest';
import  mongoose from "mongoose";
import  app from '../../server.js';
import { MongoMemoryServer } from "mongodb-memory-server";


describe('Test UserController', () => {
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
 describe('Test Create function', () => {
it('Should  create a new user', async () => {
  const response = await request(app)
      .post('/api/v1/users')
      .send({
       username:"jkadhuwa",
       password:"Uninet41234",
       name:"Musinda Justin"
      });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe("User created successfully");
    expect(response.body.user.name).toBe("Musinda Justin");
});

 it('Should throw an error if username already exist', async () => {
  const response = await request(app)
      .post('/api/v1/users')
      .send({
       username:"jkadhuwa",
       password:"Uninet41234",
       name:"Musinda Justin"
      });
    expect(response.status).toBe(409);
    expect(response.body.message).toBe("user with the same username: jkadhuwa already exisit.");
});
 });

 describe('Test userLogin function', () => {
 it('Should throw an error if username is not found', async () => {
  const response = await request(app)
      .post('/api/v1/login')
      .send({
       username:"mkadhuwa",
       password:"Uninet41234",
      });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("username or password provided was not correct");
});

it('Should throw an error if password is wrong', async () => {
  const response = await request(app)
      .post('/api/v1/login')
      .send({
       username:"jkadhuwa",
       password:"41234",
      });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("username or password provided was not correct");
});

 it('Should login the user if username and password are correct', async() => {
  const response = await request(app)
      .post('/api/v1/login')
      .send({
       username:"jkadhuwa",
       password:"Uninet41234",
      });
    expect(response.status).toBe(200);
    expect(response.body.username).toBe("jkadhuwa");
});
 });
});
