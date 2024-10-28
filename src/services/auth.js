import { User } from '../models/userSchema.js';
import bcrypt from 'bcrypt';
import { createSession } from '../utils/createSession.js';
import { Session } from '../models/sessionSchema.js';

export const findUserByEmail = (email) => User.findOne({ email });

export const createUser = async (data) => {
  const password = await bcrypt.hash(data.password, 10);
  return User.create({ ...data, password });
};

// export const

export const createActiveSession = async (userId) => {
  await Session.deleteOne({ userId });
  return Session.create({ userId, ...createSession });
};

export const deleteSession = (sessionId, sessionToken) => {
  Session.deleteOne({ _id: sessionId, refreshToken: sessionToken });
};
