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
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

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
  let photo = req.file;
  let photoUrl = null;
  if (photo) {
    if (process.env.ENABLE_CLOUDINARY === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }
  const contactData = {
    ...req.body,
    userId: req.user._id,
    photo: photoUrl,
  };
  const contact = await createContact(contactData);
  res.status(201).json({
    status: 201,
    message: 'Successfully create a contact!',
    data: contact,
  });
};

export const updateContactController = async (req, res) => {
  const { id } = req.params;
  const photo = req.file;
  let photoUrl = null;
  if (!id) {
    return res.status(400).json({ message: 'ID is required' });
  }

  if (photo) {
    if (process.env.ENABLE_CLOUDINARY === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const contact = await updateContact(id, req.body, req.user._id, photoUrl);

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
