import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const isProduction = process.env.NODE_ENV === 'production';

const setTokenCookie = (res: Response, token: string) => {
  const options = {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    secure: isProduction,
  };
  res.cookie('taskAppToken', token, options);
};

export const signup = async (req: Request, res: Response) => {
  const { email, password, name, weekday } = req.body;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error || !data) {
    return res.status(400).json({ error: error?.message });
  }

  const userId = data.user?.id;

  const { error: insertError } = await supabase.from('USERS').insert([{ id: userId, name, email, weekday }]);

  if (insertError) {
    return res.status(400).json({ error: insertError.message });
  }

  res.status(200).json({ message: 'Signup successful' });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data) {
    return res.status(400).json({ error: error?.message });
  }

  const userId = data.user?.id;
  const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });

  setTokenCookie(res, token);

  res.status(200).json({ message: 'Login successful' });
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('taskAppToken');
  res.status(200).json({ message: 'Logout successful' });
};

export const resetPassword = async (req: Request, res: Response) => {
  const { email } = req.body;

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(200).json({ message: 'Password reset email sent' });
};

// Middleware to renew token on each visit
export const renewToken = async (req: Request, res: Response, next: Function) => {
  const token = req.cookies.taskAppToken;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const renewedToken = jwt.sign({ id: (decoded as any).id }, JWT_SECRET, { expiresIn: '7d' });
      setTokenCookie(res, renewedToken); // Renew the cookie
    } catch (err) {
      console.error('Token renewal error:', err);
      res.clearCookie('token');
    }
  }
  next();
};
