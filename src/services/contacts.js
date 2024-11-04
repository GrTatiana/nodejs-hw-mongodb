import { SORT_ORDER } from '../../index.js';
import { Contact } from '../models/contactSchema.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = Contact.find({ userId });
  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const total = await Contact.countDocuments({ userId });
  const paginationData = calculatePaginationData(total, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
};
export const getContactById = (id, userId) =>
  Contact.findOne({ _id: id, userId });
export const createContact = (contactData) => Contact.create(contactData);
export const deleteContact = (id, userId) =>
  Contact.findOneAndDelete({ _id: id, userId });
export const updateContact = (id, contactData, userId) =>
  Contact.findOneAndUpdate({ _id: id, userId }, contactData, { new: true });
