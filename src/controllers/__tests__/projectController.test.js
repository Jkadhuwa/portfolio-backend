import request from 'supertest';
import  mongoose from "mongoose";
import  app from '../../server.js';
import { MongoMemoryServer } from "mongodb-memory-server";

describe('Test ProjectController ', () => {
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

    it('Should return projects if they dont exist', async () => {
       const response = await request(app)
      .get('/api/v1/projects');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('No Projects found at the moment.');
    });

    it('Should  create a new project', async () => {
        const response = await request(app)
            .post('/api/v1/projects')
            .send({
             name:"Moral of the story: Hide your murder weapon down a tree trunk.",
             description:"To be honest I feel they pull the person you think is innocent is actually guilty twist too often.Moral of the story: Hide your murder weapon down a tree trunk",
             projectCategory: 2
            });
          expect(response.status).toBe(201);
          expect(response.body.message).toBe("Project created successfully");
      });
      
      it('Should throw an error if project name already exist', async () => {
        const response = await request(app)
            .post('/api/v1/projects')
            .send({
             name:"Moral of the story: Hide your murder weapon down a tree trunk.",
             description:"To be honest I feel they pull the person you think is innocent is actually guilty twist too often.Moral of the story: Hide your murder weapon down a tree trunk",
             projectCategory: 2
            });
          expect(response.status).toBe(409);
          expect(response.body.message).toBe("Project with the same title: Moral of the story: Hide your murder weapon down a tree trunk. already exisit.");
      });


      it('Should return all projects if they  exist', async () => {
        const response = await request(app)
       .get('/api/v1/projects');
 
       expect(response.status).toBe(200);
       expect(response.body.projects.length).toBe(1);
     });
});
