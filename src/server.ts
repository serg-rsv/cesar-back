import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import logger from 'morgan';
import cors from 'cors';

const configPath = path.join(__dirname, 'config', '.env');
dotenv.config({ path: configPath });

const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('./swagger');

import { connectToDatabase } from './config';
import { User, Message } from './models';
import { authRouter, messageRouter } from './routes';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));

app.use(cors());

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

User.sync();
Message.sync();
connectToDatabase();

app.listen(process.env.PORT, () => {
  console.log(
    '\x1b[36m%s\x1b[0m',
    `Server is running on port ${process.env.PORT}`
  );
});
