import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoConfig = async (): Promise<void> => {
  try {
    const uri = process.env.MONGO_URL;
    if (!uri) {
      throw new Error('MongoDB URI not found in .env file');
    }

    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure code
  }
};

export default mongoConfig;
