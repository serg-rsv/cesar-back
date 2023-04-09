import express from 'express';
import {
  createMessage,
  getDecryptedMessage,
  getEncryptedMessage,
  getMessages,
} from '../controllers/messages';

const router = express.Router();

router.post('/', createMessage);
router.get('/', getMessages);
router.get('/:messageId', getEncryptedMessage);
router.get('/:messageId/decrypt', getDecryptedMessage);

export default router;
