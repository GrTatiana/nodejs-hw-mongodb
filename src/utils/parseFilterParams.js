const parseIsFavourite = (favourite) => {
  const isString = typeof favourite === 'string';
  if (!isString) return false;
  const isFavourite = (favourite) => ['true', 'false'].includes(favourite);
  if (isFavourite) {
    return favourite;
  }
  return false;
};

const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return 'personal';
  const contactType = (type) => ['work', 'home', 'personal'].includes(type);
  if (contactType(type)) return type;
};

const parsePhoneNumber = (number, defaultValue) => {
  const isString = typeof number === 'string';
  if (!isString) return defaultValue;
  const parsedPhoneNumber = parseInt(number);
  if (Number.isNaN(parsedPhoneNumber)) {
    return defaultValue;
  }
  return parsedPhoneNumber;
};
const parseEmail = (email, defaultValue) => {
  const isString = typeof email === 'string';
  if (!isString) return defaultValue;
  return email.includes('@') ? email : defaultValue;
};

const parseName = (name) => {
  return typeof name === 'string' ? name : 'Unknown';
};

export const parseFilterParams = (query) => {
  const { name, phoneNumber, email, isFavourite, contactType } = query;
  const parsedName = parseName(name);
  const parsedPhoneNumber = parsePhoneNumber(phoneNumber, 1111111);
  const parsedEmail = parseEmail(email, 'test@gmail.com');
  const parsedIsFavourite = parseIsFavourite(isFavourite);
  const parsedContactType = parseContactType(contactType);

  return {
    name: parsedName,
    phoneNumber: parsedPhoneNumber,
    email: parsedEmail,
    isFavourite: parsedIsFavourite,
    contactType: parsedContactType,
  };
};
