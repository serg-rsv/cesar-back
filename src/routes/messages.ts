import express from 'express';
import {
  createMessage,
  getDecryptedMessage,
  getEncryptedMessage,
  getMessages,
} from '../controllers/messages';

const router = express.Router();

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Create a new message.
 *     description: Creates a new message for the authenticated user.
 *     tags:
 *       - Messages
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MessageToSave'
 *     responses:
 *       '201':
 *         description: Message created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/', createMessage);

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Get all messages
 *     description: Get all messages for authenticated user
 *     tags:
 *       - Messages
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: An array of messages for authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/', getMessages);

/**
 * @swagger
 * /messages/{messageId}:
 *   get:
 *     summary: Get the encrypted message by ID
 *     description: Get the encrypted message from the database using the provided ID parameter in the URL path.
 *     tags:
 *       - Messages
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         description: The ID of the message to retrieve the encrypted message for
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The encrypted message of the requested message
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         $ref: '#/components/responses/NotFoundError'
 */
router.get('/:messageId', getEncryptedMessage);

/**
 * @swagger
 * /messages/{messageId}/decrypt:
 *   get:
 *     summary: Get decrypted message by ID
 *     description: Get decrypted message by ID from the database using the provided ID parameter in the URL path.
 *     tags:
 *       - Messages
 *     parameters:
 *       - in: path
 *         name: messageId
 *         required: true
 *         description: ID of the message to retrieve
 *         schema:
 *           type: integer
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Decrypted message retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DecryptedMessage'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 */
router.get('/:messageId/decrypt', getDecryptedMessage);

export default router;
