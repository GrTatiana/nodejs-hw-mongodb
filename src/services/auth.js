import { User } from '../models/userSchema.js';
import bcrypt from 'bcrypt';
import { createActiveSession } from '../utils/operationFromSession.js';
import createHttpError from 'http-errors';
import { Session } from '../models/sessionSchema.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import jwt from 'jsonwebtoken';
import { sendMail } from '../utils/sendMail.js';

export const registerUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw createHttpError(409, 'Email in use');
  }
  payload.password = await bcrypt.hash(payload.password, 10);
  return User.create(payload);
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid data');
  }
  const isCorrectPasword = await bcrypt.compare(password, user.password);
  if (!isCorrectPasword) {
    throw createHttpError(401, 'Invalid data');
  }
  const newSession = await createActiveSession(user._id);
  return newSession;
};

export const logoutUser = (sessionId) => Session.deleteOne({ _id: sessionId });

export const userRefreshSession = async (sessionId, refreshToken) => {
  const activeSession = await Session.findOne({
    _id: sessionId,
  });

  if (!activeSession) {
    throw createHttpError(401, 'Session not found!');
  }
  if (activeSession.refreshToken !== refreshToken) {
    throw createHttpError(401, 'Invalid refresh token');
  }
  if (new Date() > activeSession.refreshTokenValidUntil) {
    throw createHttpError(401, 'Invalid refresh token');
  }

  const newSession = await createActiveSession(activeSession.userId);
  if (!newSession || !newSession.accessToken) {
    throw createHttpError(500, 'Could not refresh session');
  }
  return newSession;
};

export const requestResetPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const resetToken = jwt.sign(
    { sub: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '5m' },
  );
  console.log(resetToken);

  try {
    sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Reset your password',
      html: ` To reset your password please visit to <a href="${process.env.APP_DOMAIN}/password-reset?token=${resetToken}">link</a>`,
    });
  } catch (error) {
    console.error(error);
    throw createHttpError(
      500,
      'Failed to send the email, please try again later.',
    );
  }
};

export const resetPassword = async (password, token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.sub, email: decoded.email });
    if (!user) {
      throw createHttpError(404, 'User not found');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await Session.deleteOne({ _id: decoded.sub });
    return await User.findByIdAndUpdate(
      user._id,
      {
        password: hashedPassword,
      },
      { new: true },
    );
  } catch (error) {
    if (
      error.name === 'JsonWebTokenError' ||
      error.name === 'TokenExpiredError'
    ) {
      throw createHttpError(401, 'Token is expired or invalid.');
    }
    throw error;
  }
};
