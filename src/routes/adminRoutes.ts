import { Router } from 'express';
import { getUsersController, createUserController, updateUserController, deleteUserController } from '../controllers/adminController';
import { authenticateJWT, authorizeAdmin } from '../middlewares/authMiddleware';

const router = Router();

// Get all users (pagination and filtering support)
router.get('/users', authenticateJWT, authorizeAdmin, getUsersController);

// Create a new user (admin only)
router.post('/users', authenticateJWT, authorizeAdmin, createUserController);

// Update user details (admin only)
router.put('/users/:id', authenticateJWT, authorizeAdmin, updateUserController);

// Delete a user (admin only)
router.delete('/users/:id', authenticateJWT, authorizeAdmin, deleteUserController);

export default router;
