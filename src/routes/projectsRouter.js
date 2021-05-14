import express from 'express';
import {getAllProjects, addNewProject} from '../controllers/projectController.js';
import Validator from '../middlewares/validation.js'

const projectRouter = express.Router();

projectRouter.get('/', getAllProjects);
projectRouter.post('/', Validator.createNewproject, addNewProject)

export default projectRouter;