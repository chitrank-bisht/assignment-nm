import { User, UserRole } from '../models/userModel';
import { RegisterUserDTO, UpdateUserDTO } from '../validators/userValidator';
import { hashPassword } from '../utils/hashedPassword';
import { AppDataSource } from '../config/database';

// Create a new user (admin or regular)
export const createUser = async (userData: RegisterUserDTO): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);

  const hashedPassword = await hashPassword(userData.password);

  const role: UserRole = userData.role as UserRole || 'user';

  const newUser = userRepository.create({
    ...userData,
    password: hashedPassword,
    role,  // Default role is 'user'
  });

  return await userRepository.save(newUser);
};

// Get paginated list of users with optional search and role filters
export const getAllUsers = async (page: number, limit: number, search?: string, role?: string) => {
  const userRepository = AppDataSource.getRepository(User);
  const query = userRepository.createQueryBuilder('user');

  if (search) {
    query.where('user.name LIKE :search OR user.email LIKE :search', { search: `%${search}%` });
  }

  if (role) {
    query.andWhere('user.role = :role', { role });
  }

  const [users, total] = await query
    .skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();

  return {
    users,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
};

// Update user details
export const updateUser = async (userId: number, updateData: UpdateUserDTO): Promise<User | null> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    return null;
  }

  Object.assign(user, updateData);

  return await userRepository.save(user);
};

export const deleteUser = async (userId: number): Promise<boolean | 'selfDeleteError'> => {
  const userRepository = AppDataSource.getRepository(User);

  
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    return false;
  }

  if (user.id === userId && user.role === 'admin') {
    return 'selfDeleteError';
  }

  await userRepository.remove(user);
  return true;
};