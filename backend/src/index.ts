import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskStatusRoutes from './routes/taskStatus'
import taskRoutes from './routes/task'
import userRoutes from './routes/user'
import authRoutes from './routes/auth'
import isLoggedin from './middlewares/auth';
import cookieParser from "cookie-parser"

dotenv.config(); 
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use(
  cors({
    origin: process.env.CORS_ORIGINS?.split(','),
    credentials: true,
    methods:['GET', 'POST', 'PUT', 'DELETE']
  })
)

app.use('/auth', authRoutes);
app.use('/tasks', isLoggedin, taskRoutes);
app.use('/task-status', isLoggedin, taskStatusRoutes);
app.use('/users', isLoggedin, userRoutes);

app.listen(process.env.APP_PORT || 5000, () => {
  console.log(`backend is running at http://localhost:${process.env.APP_PORT}`);
})