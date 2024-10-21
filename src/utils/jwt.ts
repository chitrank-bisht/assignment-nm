// src/utils/jwt.ts
import jwt, { SignOptions, JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'yourSecretKey';  // Use environment variable for security
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';  // Token expiration time (1 hour by default)

// Function to generate a JWT token
export const generateToken = (payload: object, options?: SignOptions): string => {
  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: EXPIRES_IN,  // Token expiration (1 hour by default)
    ...options,
  });
};

// Function to verify a JWT token
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, SECRET_KEY) as JwtPayload;
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
};

// Function to extract user data from a JWT token
export const extractUserFromToken = (token: string): JwtPayload | null => {
  const decoded = verifyToken(token);
  if (decoded && decoded.userId) {
    return decoded;
  }
  return null;
};
