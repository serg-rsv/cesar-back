import jwt from 'jsonwebtoken';
import { User } from '../../models';

const { ACCESS_TOKEN_SECRET } = process.env;

if (!ACCESS_TOKEN_SECRET) {
  console.error('ACCESS_TOKEN_SECRET is not defined');
  process.exit(1);
}

export const generateAccessToken = (user: User): string => {
  const payload = { id: user.id };
  const secret = ACCESS_TOKEN_SECRET;
  const options = { expiresIn: '7d' };
  return jwt.sign(payload, secret, options);
};
