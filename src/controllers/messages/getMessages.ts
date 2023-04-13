import { Response } from 'express';
import { Message } from '../../models';
import { AuthenticatedRequest } from '../../types';

export const getMessages = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const messagesData = await Message.findAll({
      where: {
        user_id: userId,
      },
    });
    const messages = messagesData.map((message) => ({
      id: message.id,
      text: message.encrypted_text.toString(),
    }));
    res.status(200).json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
