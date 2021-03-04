import {userService} from '../services/userService.js';
import passwordHasher from '../utils/passwordHasher.js'

export const userLogin = async(req, res) => {
    const { username, password} = req.body;
    const user = await userService.loginUser(username);
    if(!user){
       
        return res.status(401).json({status: 'error', message: 'username or password provided was not correct'});
    }
    const result = await passwordHasher.comparePasswords(user.password, password);
    if (!result){
    return res.status(401).json({status: 'error', message: 'username or password provided was not correct'});;
    }
     return res.status(200).json({
        status: "success",
        username: user.username,
        user: user.name
        });
}

export const createUser = async(req, res) => {
    const { password, username } = req.body;
    req.body.password = await passwordHasher.hashPassword(password);
    const user = await userService.addUser(req.body);
    if(!user){
        return res.status(409).json({status: '409', message: `user with the same username: ${username} already exisit.`});
    }
    return res.status(201).json({
        status: "success",
        message: 'User created successfully',
        user
    })
    
}
