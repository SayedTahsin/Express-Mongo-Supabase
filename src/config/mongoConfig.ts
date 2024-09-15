import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { scheduleCronJobs } from '../controllers/taskCorn';

dotenv.config();

const mongoConfig = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URL;
    if (!uri) {
      throw new Error('MongoDB URI not found in .env file');
    }

    await mongoose.connect(uri);
    scheduleCronJobs();
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default mongoConfig;
