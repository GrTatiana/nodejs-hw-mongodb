import { model, Schema } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: { type: String },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
  },
  { timestamps: true, versionKey: false },
);

// const updateContactSchema = new Schema(
//   {
//     name: {
//       type: String,
//     },
//     phoneNumber: {
//       type: String,
//     },
//     email: { type: String },
//     isFavourite: {
//       type: Boolean,
//       default: false,
//     },
//     contactType: {
//       type: String,
//       enum: ['work', 'home', 'personal'],
//       default: 'personal',
//     },
//   },
//   { timestamps: true, versionKey: false },
// );

export const Contact = model('Contact', contactSchema);
// export const UpdateContact = model('Contact', updateContactSchema);
