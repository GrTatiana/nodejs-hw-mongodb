import dotenv from 'dotenv';
import { initMongoConnection } from './src/db/initMongoConnection.js';
import { setupServer } from './src/server.js';

dotenv.config();

const bootstrap = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.error(error);
  }
};

bootstrap();
