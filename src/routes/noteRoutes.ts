import express from 'express';
import { createnote, updatenote, deletenote, getNotesByMail } from '../controllers/noteController';

const router = express.Router();

router.post('/', createnote);
router.get('/:mail', getNotesByMail);
router.put('/:id', updatenote);
router.delete('/:id', deletenote);

export default router;
