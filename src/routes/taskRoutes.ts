import express from 'express';
import { createTask, getTasksByMail, updateTask, deleteTask } from '../controllers/taskController';

const router = express.Router();

router.post('/tasks', createTask); // Create a new task
router.get('/tasks/:mail', getTasksByMail); // Get a task by Mail
router.put('/tasks/:id', updateTask); // Update a task by ID
router.delete('/tasks/:id', deleteTask); // Delete a task by ID

export default router;
