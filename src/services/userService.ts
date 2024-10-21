import { AppDataSource } from '../config/database'
import { User,UserRole } from '../models/userModel'; // Import User entity/model
import bcrypt from 'bcryptjs';
import { hashPassword,comparePassword } from '../utils/hashedPassword';

// Register a new user
export const registerUser = async (name: string, email: string, password: string) => {
    const userRepository = AppDataSource.getRepository(User);

  // Check if email already exists
  const existingUser = await userRepository.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Email is already in use');
  }

  // Hash the password
  const hashedPassword = await hashPassword(password);

  // Create and save new user
  const newUser = userRepository.create({ name, email, password: hashedPassword });
  return await userRepository.save(newUser);
};

// User login
export const loginUser = async (email: string, password: string) => {
    const userRepository = AppDataSource.getRepository(User);

  // Find user by email
  const user = await userRepository.findOne({ where: { email } });
  if (!user) {
    throw new Error('Invalid email');
  }

  // Compare password
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Wrong Password');
  }

  return user; // Return user object for JWT token generation
};

// Get user profile
export const getUserProfile = async (userId: number) => {
    const userRepository = AppDataSource.getRepository(User);

  // Find user by ID
  const user = await userRepository.findOne({
    where: { id: userId },
  });
  if (!user) {
    throw new Error('User not found');
  }

  return user; // Return user profile
};

// Additional methods for admin users (e.g., creating, updating, deleting users)
export const createUserAsAdmin = async (name: string, email: string, password: string, role: UserRole) => {
    const userRepository = AppDataSource.getRepository(User);

  // Check if email already exists
  const existingUser = await userRepository.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('Email is already in use');
  }

  // Hash password and assign role
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = userRepository.create({ name, email, password: hashedPassword, role });

  return await userRepository.save(newUser);
};

// Update user details (admin only)
export const updateUser = async (userId: number, data: { name?: string; email?: string; role?: UserRole }) => {
    const userRepository = AppDataSource.getRepository(User);

  // Find the user
  const user = await userRepository.findOne({where: { id: userId },});
  if (!user) {
    throw new Error('User not found');
  }

  // Update the user's data
  if (data.role && !Object.values(UserRole).includes(data.role)) {
    throw new Error('Invalid role');
}
  Object.assign(user, data);

  return await userRepository.save(user);
};

// Delete a user (admin only)
export const deleteUser = async (userId: number) => {
    const userRepository = AppDataSource.getRepository(User);

  // Ensure admin doesn't delete themselves
  const user = await userRepository.findOne({where: { id: userId },});
  if (!user) {
    throw new Error('User not found');
  }

  await userRepository.remove(user);
};

