import app from './server.js';
import winston from 'winston';
import dotenv from'dotenv';
import mongoose from 'mongoose';
import logger from './config/logging.js';


dotenv.config();
logger();
const PORT = process.env.PORT;


const uriPROD = process.env.ATLAS_URI_PROD;
const uriDEV = process.env.ATLAS_URI_DEV;

const environment = process.env.NODE_ENV;
let uri = ''
if(environment === 'production') {
uri = uriPROD;
}
else{
  uri = uriDEV;
}

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

mongoose.connect(uri,connectionParams)
    .then( () => {
        winston.info('Connected to database ');
    }).then(() => {
       app.listen(PORT, () => {
      winston.info( `🚀  Server ready at ${PORT}`)   
});
    })
    .catch( (err) => {
        winston.error(`Error connecting to the database. \n${err}`);
 });
