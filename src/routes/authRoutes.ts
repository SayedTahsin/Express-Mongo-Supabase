import { Router } from 'express';
import { signup, login, logout, resetPassword, renewToken } from '../controllers/authController';
import { deleteUser, updateUser, getUser } from '../controllers/userController';
import { checkAuth } from '../middlewares/checkAuth';
const router = Router();

// Apply the renewToken middleware to renew token on each visit
router.use(renewToken);

router.post('/signup', signup);
router.post('/login', login);
router.post('/reset', resetPassword);
router.get('/:email', checkAuth, getUser);
router.post('/logout', checkAuth, logout);
router.put('/update/:email', checkAuth, updateUser);
router.delete('/delete/:email', checkAuth, deleteUser);
export default router;
