import { User } from '../models/userSchema.js';
import bcrypt from 'bcrypt';
import { createActiveSession } from '../utils/operationFromSession.js';
import createHttpError from 'http-errors';
import { Session } from '../models/sessionSchema.js';

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
