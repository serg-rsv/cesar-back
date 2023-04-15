import { Request, Response } from 'express';
import { hash } from 'bcryptjs';
import { User } from '../../models';
import { generateAccessToken } from '../../utils/auth';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: 'Bad request. Email and password are required.' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: 'User with such email already exists' });
    }

    const passwordHash = await hash(password, 12);

    const user = await User.create({ email, passwordHash });

    const accessToken = generateAccessToken(user);

    await user.update({ token: accessToken });

    return res.status(201).json({ accessToken, email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
