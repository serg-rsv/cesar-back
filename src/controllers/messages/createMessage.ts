import { Response } from 'express';
import { Message } from '../../models';
import { caesarEncrypt, xor } from '../../utils/cipher';
import { AuthenticatedRequest } from '../../types';

export const createMessage = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user!.id;
    const { message, key, type } = req.body;

    let encryptedMessage: Buffer;
    switch (type) {
      case 'cesar':
        encryptedMessage = Buffer.from(caesarEncrypt(message, Number(key)));
        break;
      case 'xor':
        encryptedMessage = Buffer.from(xor(message, key));
        console.log('encryptedMessage:', encryptedMessage);
        break;

      default:
        throw new Error('Failed to encrypt message');
    }

    const messageSaved = await Message.create({
      user_id: userId,
      encrypted_message: encryptedMessage,
      encryption_key: key,
      encryption_type: type,
    });

    res
      .status(201)
      .json({ messageSaved, messageString: encryptedMessage.toString() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
