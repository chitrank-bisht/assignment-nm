import { Request, Response } from 'express';
import { registerUser, loginUser, getUserProfile } from '../services/userService';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { RegisterUserDTO, LoginUserDTO } from '../validators/userValidator';
import { generateToken } from '../utils/jwt';

// Controller to handle user registration
export const registerUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const registerData = plainToInstance(RegisterUserDTO, req.body);
    const errors = await validate(registerData);
    if (errors.length > 0) {
      res.status(400).json({ message: 'Validation failed', errors });
      return;
    }

    const user = await registerUser(registerData.name, registerData.email, registerData.password);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to handle user login
export const loginUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const loginData = plainToInstance(LoginUserDTO, req.body);
    const errors = await validate(loginData);
    if (errors.length > 0) {
      res.status(400).json({ message: 'Validation failed', errors });
      return;
    }

    const user = await loginUser(loginData.email, loginData.password);

    const token = generateToken({ userId: user.id, role: user.role });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

// Controller to get user profile (requires authentication)
export const getUserProfileController = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated' });
      return;
    }

    const userId = req.user.userId;
    const user = await getUserProfile(userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      registeredAt: user.createdAt,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
