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
    const { encrypted_text, encryption_type, encryption_key } = storedMessage;
    let decryptedText;
    switch (encryption_type) {
      case 'cesar':
        decryptedText = caesarDecrypt(
          encrypted_text.toString(),
          Number(encryption_key)
        );
        break;
      case 'xor':
        decryptedText = xor(encrypted_text.toString(), encryption_key);
        break;

      default:
        throw new Error('Failed to decrypt message');
    }

    res.status(200).json({ id: messageId, text: decryptedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
