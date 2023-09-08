import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import postRoutes from './routes/posts.js';
import userRouter from './routes/user.js';
import dotenv from 'dotenv';
import { connectToDatabase } from './DB/mongodb.js';

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
dotenv.config();

app.use('/posts', postRoutes);
app.use('/user', userRouter);

const PORT = process.env.PORT;

connectToDatabase(); // Call the function to connect to the database

app.listen(PORT, () => {
  console.log(`Server Running on 127.0.0.1 : ${PORT}`);
});
