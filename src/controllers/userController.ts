import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const getUser = async (req: Request, res: Response) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const { data, error } = await supabase.from('USERS').select('*').eq('email', email).single();

  if (error || !data) {
    return res.status(404).json({ message: 'User not found', error: error?.message });
  }

  res.status(200).json(data);
};

export const updateUser = async (req: Request, res: Response) => {
  const { email } = req.params;
  const { name, weekday } = req.body;

  if (!name && !weekday) {
    return res.status(400).json({ message: 'No data to update' });
  }

  const updates: { name?: string; weekday?: string } = {};
  if (name) updates.name = name;
  if (weekday) updates.weekday = weekday;

  const { error } = await supabase.from('USERS').update(updates).eq('email', email);

  if (error) {
    return res.status(400).json({ message: 'Failed to update user data', error: error.message });
  }

  res.status(200).json({ message: 'User info updated successfully' });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { email } = req.params;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  const { error } = await supabase.from('USERS').delete().eq('email', email);

  if (error) {
    return res.status(400).json({ message: 'Failed to delete user', error: error.message });
  }

  res.status(200).json({ message: 'User deleted successfully' });
};
