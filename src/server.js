import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { Contact } from './models/contactSchema.js';
import dotenv from 'dotenv';

dotenv.config();

export function setupServer() {
  const PORT = process.env.PORT || 3001;

  const app = express();

  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.get('/contacts/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const contact = await Contact.findById(id);
      if (!contact) {
        res.status(400).json({
          message: 'Contact not found',
        });
      }
      res.json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data: contact,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
