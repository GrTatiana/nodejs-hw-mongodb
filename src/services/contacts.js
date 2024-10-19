import { Contact } from '../models/contactSchema.js';

export const getAllContacts = () => Contact.find();
export const getContactById = (id) => Contact.findById(id);
export const createContact = (contactData) => Contact.create(contactData);
export const deleteContact = (id) => Contact.findByIdAndDelete(id);
export const updateContact = (id, contactData) =>
  Contact.findByIdAndUpdate(id, contactData, { new: true });
