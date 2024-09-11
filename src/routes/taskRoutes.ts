import express from 'express';
import { createTask, getTaskById, updateTask, deleteTask, getAllTasks } from '../controllers/taskController';

const router = express.Router();

router.post('/tasks', createTask); // Create a new task
router.get('/tasks/:id', getTaskById); // Get a task by ID
router.put('/tasks/:id', updateTask); // Update a task by ID
router.delete('/tasks/:id', deleteTask); // Delete a task by ID
router.get('/tasks', getAllTasks); // Get all tasks

export default router;
