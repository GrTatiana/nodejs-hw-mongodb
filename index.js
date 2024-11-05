import dotenv from 'dotenv';
import { initMongoConnection } from './src/db/initMongoConnection.js';
import { setupServer } from './src/server.js';

dotenv.config();

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const THIRTY_DAY = 30 * 24 * 60 * 60 * 1000;

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

const bootstrap = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
