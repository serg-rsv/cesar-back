import { Response } from 'express';
import { Message } from '../../models';
import { AuthenticatedRequest } from '../../types';

export const getEncryptedMessage = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    const { messageId } = req.params;
    const storedMessage = await Message.findByPk(messageId);
    if (!storedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }
    if (userId !== storedMessage.user_id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.status(200).json({
      id: storedMessage.id,
      text: storedMessage.encrypted_text.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
