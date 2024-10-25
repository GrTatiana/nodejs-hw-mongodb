import { SORT_ORDER } from '../../index.js';
import { Contact } from '../models/contactSchema.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const totalContacts = await Contact.countDocuments();
  const contactsQuery = Contact.find();

  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();
  const paginationData = calculatePaginationData(totalContacts, perPage, page);
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
