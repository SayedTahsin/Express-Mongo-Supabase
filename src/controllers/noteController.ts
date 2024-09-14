import { Request, Response } from 'express';
import Note from '../models/Note';

// Create note
export const createnote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text, mail } = req.body;

    const newnote = new Note({ text, mail });
    const savednote = await newnote.save();

    res.status(201).json(savednote);
  } catch (error) {
    res.status(500).json({ message: 'Error creating note', error });
  }
};

//get Note by mail
export const getNotesByMail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { mail } = req.params;

    // Fetch tasks by mail
    const notes = await Note.find({ mail }); // Get only the note field

    if (notes.length === 0) {
      res.status(404).json({ message: 'No notes found for this email.' });
      return;
    }

    // Return the notes
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Update note
export const updatenote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { text } = req.body;
    const note = await Note.findByIdAndUpdate(req.params.id, { text }, { new: true });

    if (note) {
      res.status(200).json(note);
    } else {
      res.status(404).json({ message: 'note not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating note', error });
  }
};

// Delete note
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
