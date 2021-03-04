import User from '../models/user.model.js'

class UserService {
    async loginUser (username) {
    const user = await User.findOne({username});
    if(!user){
      return false;
  } 
   return user;
  }

   async addUser (payload) {
    const {username, password, name} = payload;
    const user = await User.findOne({username});
  if(!user){
    try {
    const newUser = new User({username, password, name});
    return  newUser.save();
    } catch (error) {
       return  error;
    }
   
  } 
  return false;

 }
}
export const userService = new UserService();
