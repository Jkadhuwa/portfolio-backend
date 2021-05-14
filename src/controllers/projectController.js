import { projectService } from '../services/projectService.js';

export const getAllProjects = async(req, res) => {
    const projects = await projectService.findAllProjects();
    if(!projects.length){
         return res.status(200).json({status: 'success', message: "No Projects found at the moment."});
    }

    return res.status(200).json({
        status: "success",
        projects
    });
};

export const addNewProject = async(req, res) => {
    const project = await projectService.addNewProject(req.body);
     if(!project){
        return res.status(409).json({status: 'error', message: `Project with the same title: ${req.body.name} already exisit.`});
    }
    return res.status(201).json({
        status: "success",
        message: 'Project created successfully',
        project
    })
};