import express from 'express';
import { createTask, getTasksByMail, updateTask, deleteTask } from '../controllers/taskController';

const router = express.Router();

router.post('/', createTask);
router.get('/:mail', getTasksByMail);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
