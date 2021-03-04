import express from 'express';
import cors from 'cors';


import router from './routes/index.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/api/v1', router);
app.use((req, res) => {
 return res.status(404).json({error:'Sorry you have hit an invalid url!!!!'})
});

export default app;