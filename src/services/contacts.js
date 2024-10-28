import { SORT_ORDER } from '../../index.js';
import { Contact } from '../models/contactSchema.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = Contact.find();
  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const total = await Contact.countDocuments();
  const paginationData = calculatePaginationData(total, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
};
export const getContactById = (id) => Contact.findById(id);
export const createContact = (contactData) => Contact.create(contactData);
export const deleteContact = (id) => Contact.findByIdAndDelete(id);
export const updateContact = (id, contactData) =>
  Contact.findByIdAndUpdate(id, contactData, { new: true });
