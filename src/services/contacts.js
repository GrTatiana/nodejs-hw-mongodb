export { Contact } from '../models/contactSchema.js';

export const getAllContacts = () => Contact.find();
export const getContactById = (contactId) => Contact.findById(contactId);
export const createContact = (contactData) => Contact.create(contactData);
export const deleteContact = (contactId) =>
  Contact.findByIdAndDelete(contactId);
export const updateContact = (contactID, contactData) =>
  Contact.findByIdAndUpdate(contactID, contactData, { new: true });
