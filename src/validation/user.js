import Joi from 'joi';

export const usersRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'any.required': 'Ім’я користувача є обов’язковим',
    'string.base': 'Ім’я користувача має бути рядком',
  }),
  email: Joi.string()
    .min(3)
    .max(20)
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string()
    .min(8)
    .max(20)
    .required()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
