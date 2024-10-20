import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import error from 'http-errors';

export const getAllContactsController = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (contact) {
    res.json({
      status: 200,
      message: `Successfully found contact with id ${id}!`,
      data: contact,
    });
  }
  throw error(404, 'Contact not found');
};

export const createContactsController = async (req, res) => {
  const contact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully create a contact!',
    data: contact,
  });
};

export const updateContactController = async (req, res) => {
  const { id } = req.params;
  const contact = await updateContact(id, req.body);
  if (!contact) {
    throw error(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully create a contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const contact = await deleteContact(id);
  if (!contact) {
    throw error(404, 'Contact not found');
  }
  res.status(204).send('Successfully delete a contact!');
};
