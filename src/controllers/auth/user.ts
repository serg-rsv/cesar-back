import { Response } from 'express';
import { User } from '../../models';
import { AuthenticatedRequest } from '../../types';

export const user = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const user = await User.findByPk(userId);

    return res.status(200).json({ email: user!.email });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
