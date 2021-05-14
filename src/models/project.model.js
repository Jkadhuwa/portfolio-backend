import mongoose from 'mongoose';

const Schema =  mongoose.Schema;

const ProjectSchema = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3
    },
    description: {
        type: String,
        required: true,
        minlength: 10 
    },
    projectCategory:{
      type: String,
      required: true
     },
},
{
    timestamps: true,
  });
  
  const Project = mongoose.model('Project', ProjectSchema);
  
  export default Project;