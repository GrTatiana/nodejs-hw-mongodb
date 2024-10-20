import { Router } from 'express';
import {
  createContactsController,
  deleteContactController,
  getAllContactsController,
  updateContactController,
  getContactByIdController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  contactsSchema,
  updateContactSchema,
  validateBody,
} from '../validation/contacts.js';

const contactsRouter = Router();
contactsRouter.get(
  '/',
  validateBody(contactsSchema),
  ctrlWrapper(getAllContactsController),
);
contactsRouter.get(
  '/:id',
  isValidId,
  validateBody(contactsSchema),
  ctrlWrapper(getContactByIdController),
);
contactsRouter.post(
  '/',
  validateBody(contactsSchema),
  ctrlWrapper(createContactsController),
);
contactsRouter.patch(
  '/:id',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);
contactsRouter.delete(
  '/:id',
  isValidId,
  validateBody(contactsSchema),
  ctrlWrapper(deleteContactController),
);

export default contactsRouter;
