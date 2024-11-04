import Joi from 'joi';

export const contactsCollection = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'any.required': 'Ім’я користувача є обов’язковим',
    'string.base': 'Ім’я користувача має бути рядком',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+380\d{9}$/)
    .required()
    .messages({
      'string.pattern.base': 'Номер телефону має бути у форматі +380XXXXXXXXX',
      'string.empty': 'Поле номеру телефону не може бути порожнім',
    }),
  email: Joi.string()
    .min(3)
    .max(20)
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .min(3)
    .max(20)
    .valid('work', 'home', 'personal')
    .required(),
});

export const updateContactsCollection = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Username should be a string',
  }),
  phoneNumber: Joi.string()
    .pattern(/^\+380\d{9}$/)
    .messages({
      'string.pattern.base': 'Номер телефону має бути у форматі +380XXXXXXXXX',
      'string.empty': 'Поле номеру телефону не може бути порожнім',
    }),
  email: Joi.string()
    .min(3)
    .max(20)
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().min(3).max(20).valid('work', 'home', 'personal'),
  userId: Joi.string().required(),
});
