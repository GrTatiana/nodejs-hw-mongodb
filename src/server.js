import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
// import { Contact } from './models/contactSchema.js';
import dotenv from 'dotenv';
import contactsRouter from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { isValidId } from './middlewares/isValidId.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

export const setupServer = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  app.use('/contacts', contactsRouter);
  app.use('*', notFoundHandler);
  app.use(errorHandler);
  app.use(isValidId);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
