import { Response } from 'express';
import { Message } from '../../models';
import { AuthenticatedRequest } from '../../types';

export const getMessages = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const messages = await Message.findAll({
      where: {
        user_id: userId,
      },
    });
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
