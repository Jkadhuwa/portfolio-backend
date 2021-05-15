import Joi from 'joi';


export default {
    /**
     * @description Validates req.body 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    loginValidator(req, res, next){

        const loginSchema = Joi.object().keys({
            username: Joi.string().min(3).required(),
            password: Joi.string().min(4).max(30).required()
        });
        const {error} = loginSchema.validate(req.body);
        if(error){
         return res.status(400).json({
              error: error.details[0].message.replace(/\\|(")/g, '')
         })
        }
        next();
    },

    signupValidator(req, res, next){
        const signupSchema = Joi.object({
            username: Joi.string().min(3).max(30).required(),
            password: Joi.string().min(4).max(30).required(),
            name: Joi.string().regex(/^[a-zA-Z\s]+$/i).required()
        });
        const {error} = signupSchema.validate(req.body);
        if(error){
         return res.status(400).json({
              error: error.details[0].message.replace(/\\|(")/g, '')
         });
        }
        next();
    },

    createBlogValidator(req, res, next){
        const newBlogSchema = Joi.object({
            title: Joi.string().min(3).max(200).required(),
            body: Joi.string().min(100).required(),
        });
        const {error} = newBlogSchema.validate(req.body);
        if(error){
        
         return res.status(400).json({
              error: error.details[0].message.replace(/\\|(")/g, ''),
         });
        }
        next();

    },

    createNewproject(req, res, next) {
        const newProjectSchema = Joi.object({
            name: Joi.string().min(15).max(300).required(),
            description: Joi.string().min(100).max(1000).required(),
            projectCategory: Joi.number().min(0).max(3).required()
        })
        const {error} = newProjectSchema.validate(req.body);
        if(error){
        
         return res.status(400).json({
              error: error.details[0].message.replace(/\\|(")/g, ''),
         });
        }
        next();
    }
}