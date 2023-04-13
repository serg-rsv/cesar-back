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
    const { text, key, type } = req.body;

    if (!text || !key || !type) {
      return res
        .status(400)
        .json({ error: 'Bad request. Wrong request object.' });
    }

    let encryptedText: Buffer;
    switch (type) {
      case 'cesar':
        encryptedText = Buffer.from(caesarEncrypt(text, Number(key)));
        break;
      case 'xor':
        encryptedText = Buffer.from(xor(text, key));
        console.log('encryptedText:', encryptedText);
        break;

      default:
        throw new Error('Failed to encrypt message');
    }

    const messageSaved = await Message.create({
      user_id: userId,
      encrypted_text: encryptedText,
      encryption_key: key,
      encryption_type: type,
    });

    res.status(201).json({
      id: messageSaved.id,
      text: encryptedText.toString(),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
