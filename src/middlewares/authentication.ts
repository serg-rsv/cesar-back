import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models';
import { AuthenticatedRequest } from '../types';

interface JwtPayload {
  id: number;
}

const { ACCESS_TOKEN_SECRET } = process.env;

if (!ACCESS_TOKEN_SECRET) {
  console.error('ACCESS_TOKEN_SECRET is not defined');
  process.exit(1);
}

export const authentication = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Missing authorization header' });
  }

  const [bearer, accessToken] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !accessToken) {
    return res
      .status(401)
      .json({ message: 'Invalid authorization header format' });
  }

  try {
    const decoded = jwt.verify(accessToken, ACCESS_TOKEN_SECRET) as JwtPayload;
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid access token' });
  }
};
