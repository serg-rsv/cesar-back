import express from 'express';
import { register, login } from '../controllers/auth';

const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Authorization
 *     summary: Register new user
 *     description: Register a new user with email and password
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: User email and password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthRequestBody'
 *     responses:
 *       201:
 *         description: Access token is generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AccessToken'
 *       400:
 *        $ref: '#/components/responses/BadRequestError'
 *       409:
 *        description: Conflict. User with such email already exists.
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Error message
 *                  example: User with such email already exists.
 */
router.post('/register', register);

/**
 * @swagger
 *   /auth/login:
 *     post:
 *       tags:
 *         - Authorization
 *       summary: Login user
 *       description: Login user by email and password
 *       produces:
 *         - application/json
 *       requestBody:
 *         description: User email and password
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthRequestBody'
 *       responses:
 *         200:
 *           description: Access token is generated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/AccessToken'
 *         400:
 *           $ref: '#/components/responses/BadRequestError'
 *         401:
 *           $ref: '#/components/responses/UnauthorizedError'
 */
router.post('/login', login);

export default router;
