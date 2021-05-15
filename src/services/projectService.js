import Project from '../models/project.model.js'

class ProjectService {
    async addNewProject(payload) {
        const { name,description, projectCategory } = payload;
        const project = await Project.findOne({name});
    if(!project){
      try {
       const newProject = new Project({ name, description, projectCategory});
       return  newProject.save();
    } catch (error) {
       return  error;
    }
  } 
  return false;
}

    async findAllProjects(){
        return await Project.find();
      }
}
export const projectService = new ProjectService();