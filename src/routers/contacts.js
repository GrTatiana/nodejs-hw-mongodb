import { Router } from 'express';
import {
  createContactsController,
  deleteContactController,
  getAllContactsController,
  updateContactController,
  getContactByIdController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();
contactsRouter.get('/', ctrlWrapper(getAllContactsController));
contactsRouter.get('/:id', ctrlWrapper(getContactByIdController));
contactsRouter.post('/', ctrlWrapper(createContactsController));
contactsRouter.patch('/:id', ctrlWrapper(updateContactController));
contactsRouter.delete('/:id', ctrlWrapper(deleteContactController));

export default contactsRouter;
