import bcrypt from 'bcrypt';

export default {

    hashPassword (password){
        return bcrypt.hash(password, 10);
    },

    comparePasswords(hashedPassword, password){
        return bcrypt.compare(password, hashedPassword);
    }
}