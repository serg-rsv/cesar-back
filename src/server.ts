import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import logger from 'morgan';

const configPath = path.join(__dirname, 'config', '.env');
dotenv.config({ path: configPath });

import { connectToDatabase } from './config';
import { User, Message } from './models';
import { authRouter, messageRouter } from './routes';
import { authentication } from './middlewares';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(logger(formatsLogger));

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/messages', authentication, messageRouter);

User.sync();
Message.sync();
connectToDatabase();

app.listen(process.env.PORT, () => {
  console.log(
    '\x1b[36m%s\x1b[0m',
    `Server is running on port ${process.env.PORT}`
  );
});
