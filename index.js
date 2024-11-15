import dotenv from 'dotenv';
import { initMongoConnection } from './src/db/initMongoConnection.js';
import { setupServer } from './src/server.js';
import path from 'node:path';
import { createDirIfNotExists } from './src/utils/createDirIfNotExists.js';

dotenv.config();

export const SWAGGER_PATH = path.join(process.cwd(), 'docs', 'swagger.json');

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const THIRTY_DAY = 30 * 24 * 60 * 60 * 1000;
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'tmp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

const bootstrap = async () => {
  try {
    await initMongoConnection();
    await createDirIfNotExists(TEMP_UPLOAD_DIR);
    await createDirIfNotExists(UPLOAD_DIR);
    setupServer();
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
