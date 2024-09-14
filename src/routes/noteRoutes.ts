import express from 'express';
import { createnote, updatenote, deletenote, getNotesByMail } from '../controllers/noteController';

const router = express.Router();

router.post('/notes', createnote); // Create a new note
router.get('/notes/:mail', getNotesByMail); // Get a note by mail
router.put('/notes/:id', updatenote); // Update a note by ID
router.delete('/notes/:id', deletenote); // Delete a note by ID

export default router;
