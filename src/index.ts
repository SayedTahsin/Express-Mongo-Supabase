import express from 'express';
import mongoConfig from './config/mongoConfig';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes';
import noteRoutes from './routes/noteRoutes';

// Initialize dotenv
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// a middleware that allows your Express app to understand JSON data in requests
app.use(express.json());

// MongoDB connection
mongoConfig();

app.use('/api/tasks', taskRoutes); // Task api routes

app.use('/api/notes', noteRoutes); // Note api routes

app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});
