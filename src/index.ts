import express from 'express';
import mongoConfig from './config/mongoConfig';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes';

// Initialize dotenv
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
// Express middlewares
app.use(express.json());

// MongoDB connection
mongoConfig();

// Task routes
app.use('/api', taskRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});
