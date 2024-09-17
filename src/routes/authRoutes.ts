import { Router } from 'express';
import { signup, login, logout, resetPassword, renewToken } from '../controllers/authController';

const router = Router();

// Apply the renewToken middleware to renew token on each visit
router.use(renewToken);

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/reset-password', resetPassword);

export default router;
