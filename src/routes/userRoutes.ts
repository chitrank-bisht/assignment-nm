import { Router } from 'express';
import { registerUserController, loginUserController, getUserProfileController } from '../controllers/userController';
import { authenticateJWT } from '../middlewares/authMiddleware';

const router = Router();

// User registration
router.post('/register', registerUserController);

// User login
router.post('/login', loginUserController);

// Get user profile
router.get('/profile', authenticateJWT, getUserProfileController);

export default router;