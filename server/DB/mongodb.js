import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const URL = process.env.MONGODB;

export function connectToDatabase() {
  mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Database Connected'))
    .catch((err) => console.log(err));
}
