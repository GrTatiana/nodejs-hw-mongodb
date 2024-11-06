import fs from 'node:fs/promises';
import path from 'node:path';
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from '../services/contacts.js';
import error from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId: req.user._id,
  });
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id, req.user._id);
  if (!contact) {
    throw error(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data: contact,
  });
};

export const createContactsController = async (req, res) => {
  console.log(req.file);
  let photo = null;
  if (typeof req.file !== 'undefined') {
    const photo = await fs.rename(
      req.file.path,
      path.resolve('src', 'public', 'photo', 'req.file.filename'),
    );
    photo = `http://localhost:3000/photos/${req.file.filename}`;
  }
  const contactData = { ...req.body, userId: req.user._id, photo };
  const contact = await createContact(contactData);
  res.status(201).json({
    status: 201,
    message: 'Successfully create a contact!',
    data: contact,
  });
};

export const updateContactController = async (req, res) => {
  const { id } = req.params;
  const contact = await updateContact(id, req.body, req.user._id);
  if (!contact) {
    throw error(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully updated contact!',
    data: contact,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const contact = await deleteContact(id, req.user._id);
  if (!contact) {
    throw error(404, 'Contact not found');
  }
  res.status(204).send();
};
