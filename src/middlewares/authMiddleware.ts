import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Middleware to protect routes and ensure the user is authenticated
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token missing or invalid' });
  }

  const token = authHeader.split(' ')[1]; // Extract the token from the Bearer header
  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }

  req.user = decodedToken;

  next();
};

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Authentication token missing or malformed' });
      return;
    }
  
    const token = authHeader.split(' ')[1];
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      req.user = decoded as { userId: string, role: string };
      next();
    } catch (error) {
      res.status(403).json({ message: 'Invalid or expired token' });
      return;
    }
  };

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.role !== 'admin') {
    res.status(403).json({ message: 'Access denied: Admins only' });
    return;
  }

  next();
};

