import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pas: process.env.SMTP_PASSWORD,
  },
});

export const sendMail = (message) => {
  transporter.sendMail(message);
};
