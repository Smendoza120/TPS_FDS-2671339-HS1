import express from 'express';
import cors from 'cors';
import interfazRoutes from './api/routes/interfaz.routes.js';3
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(cors())
app.use(express.json());

app.use('/server/v1/users', interfazRoutes);


app.get((req,res)=>{
  res.status(404).send({message: 'Error 404 no encontrado'})
})


export default app;