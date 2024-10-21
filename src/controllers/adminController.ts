import { Request, Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { createUser, getAllUsers, updateUser, deleteUser } from '../services/adminService';
import { RegisterUserDTO, UpdateUserDTO } from '../validators/userValidator';

export const createUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const createUserData = plainToInstance(RegisterUserDTO, req.body);
    const errors = await validate(createUserData);

    if (errors.length > 0) {
      res.status(400).json({ message: 'Validation failed', errors });
      return;
    }

    const user = await createUser(createUserData);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsersController = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string | undefined;  
    const role = req.query.role as string | undefined;

    const users = await getAllUsers(page, limit, search, role);
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to handle updating a user
export const updateUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      res.status(400).json({ message: 'Invalid user ID' });
      return;
    }

    const updateUserData = plainToInstance(UpdateUserDTO, req.body);
    const errors = await validate(updateUserData);

    if (errors.length > 0) {
      res.status(400).json({ message: 'Validation failed', errors });
      return;
    }

    const updatedUser = await updateUser(userId, updateUserData);
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to handle deleting a user
export const deleteUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = parseInt(req.params.id, 10);
    if (isNaN(userId)) {
      res.status(400).json({ message: 'Invalid user ID' });
      return;
    }

    const result = await deleteUser(userId);
    if (result === 'selfDeleteError') {
      res.status(403).json({ message: 'Admins cannot delete themselves' });
      return;
    }
    if (!result) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
