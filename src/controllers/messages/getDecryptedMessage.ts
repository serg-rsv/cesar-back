import { Response } from 'express';
import { Message } from '../../models';
import { caesarDecrypt, xor } from '../../utils/cipher';
import { AuthenticatedRequest } from '../../types';

export const getDecryptedMessage = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { messageId } = req.params;
    const storedMessage = await Message.findByPk(messageId);
    if (!storedMessage) {
      return res.status(404).json({ error: 'Message not found' });
    }
    const { encrypted_message, encryption_type, encryption_key } =
      storedMessage;
    let decryptedMessage;
    switch (encryption_type) {
      case 'cesar':
        decryptedMessage = caesarDecrypt(
          encrypted_message.toString(),
          Number(encryption_key)
        );
        break;
      case 'xor':
        decryptedMessage = xor(encrypted_message.toString(), encryption_key);
        break;

      default:
        throw new Error('Failed to decrypt message');
    }

    res.status(200).json({ id: messageId, decryptedMessage });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
