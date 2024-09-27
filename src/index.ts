import express from 'express';
import mongoConfig from './config/mongoConfig';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes';
import noteRoutes from './routes/noteRoutes';
import authRoutes from './routes/authRoutes';
import { checkAuth } from './middlewares/checkAuth';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// DB connections
mongoConfig();

// Routes
app.use('/api/user', authRoutes);
app.use('/api/tasks', checkAuth, taskRoutes);
app.use('/api/notes', checkAuth, noteRoutes);
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Task App</title>
        <style>
          body {
            height: 100vh;
            margin: 60;
            text-align: center;
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            color: #333;
          }
        </style>
      </head>
      <body>
        <h1><code>Assalamualykum</code></h1>
        <br>
        <code>I have decided to re-write this app using Hono and Bun.</code>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});
