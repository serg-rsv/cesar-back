import express from 'express';
import {
  createMessage,
  getDecryptedMessage,
  getMessages,
} from '../controllers/messages';

const router = express.Router();

router.post('/', createMessage);
router.get('/', getMessages);
router.get('/:messageId', getDecryptedMessage);

export default router;
