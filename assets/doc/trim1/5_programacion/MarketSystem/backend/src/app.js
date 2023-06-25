import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from'morgan';

//Routers
import userRout from './api/routes/users.routes.js';

const app = express();

dotenv.config();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json());

app.use('/', userRout)

export default app;