import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  password: {
      type: String,
      required: true,
      minlength: 4
      
  },
   name:{
    type: String,
    required: true,
    trim: true,
  
},
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;