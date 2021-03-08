import mongoose from 'mongoose';

const Schema =  mongoose.Schema;


const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  body: {
      type: String,
      required: true,
      minlength: 4  
  },
   comment:[{
    author: String,
    comment: String,
   },
    {
     timestamps: true
    }
],
}, {
  timestamps: true,
});

const Blog = mongoose.model('Blog', blogSchema);

export default Blog;