import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from'morgan';

//Routers

const app = express();

dotenv.config();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json());



export default app;