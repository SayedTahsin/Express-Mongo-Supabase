import express from 'express';
import mongoConfig from './config/mongoConfig';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes';
import noteRoutes from './routes/noteRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// DB connections
mongoConfig();

// Routes
app.use('/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/notes', noteRoutes);

app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});
