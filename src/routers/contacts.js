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
import { validateBody } from '../middlewares/validateBody.js';
import {
  contactsCollection,
  updateContactsCollection,
} from '../validation/contacts.js';
import { upload } from '../middlewares/upload.js';

const contactsRouter = Router();
contactsRouter.get('/', ctrlWrapper(getAllContactsController));
contactsRouter.get('/:id', isValidId, ctrlWrapper(getContactByIdController));
contactsRouter.post(
  '/',
  upload.single('photo'),
  validateBody(contactsCollection),
  ctrlWrapper(createContactsController),
);
contactsRouter.patch(
  '/:id',
  isValidId,
  upload.single('photo'),
  validateBody(updateContactsCollection),
  ctrlWrapper(updateContactController),
);
contactsRouter.delete('/:id', isValidId, ctrlWrapper(deleteContactController));

export default contactsRouter;
