import { Request, Response } from 'express';
import Note from '../models/Note';

export const createnote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, mail, color } = req.body;

    const newnote = new Note({ text, mail, color });
    const savednote = await newnote.save();

    res.status(201).json(savednote);
  } catch (error) {
    res.status(500).json({ message: 'Error creating note', error });
  }
};

export const getNotesByMail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { mail } = req.params;

    const notes = await Note.find({ mail });

    if (notes.length === 0) {
      res.status(404).json({ message: 'No notes found for this email.' });
      return;
    }

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updatenote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, color } = req.body;
    const note = await Note.findByIdAndUpdate(req.params.id, { text, color }, { new: true });

    if (note) {
      res.status(200).json(note);
    } else {
      res.status(404).json({ message: 'note not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating note', error });
  }
};

export const deletenote = async (req: Request, res: Response): Promise<void> => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (note) {
      res.status(200).json({ message: 'note deleted successfully' });
    } else {
      res.status(404).json({ message: 'note not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting note', error });
  }
};
