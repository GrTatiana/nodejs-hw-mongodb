import { FIFTEEN_MINUTES, THIRTY_DAY } from '../../index.js';
import { randomBytes } from 'node:crypto';
import { Session } from '../models/sessionSchema.js';

export const createSession = () => {
  const accessToken = randomBytes(40).toString('base64');
  const refreshToken = randomBytes(40).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAY),
  };
};

export const createActiveSession = async (userId) => {
  await Session.deleteOne({ userId });
  console.log('Creating session with userId:', userId);
  const sessionData = createSession();
  const session = await Session.create({ userId, ...sessionData });
  return session;
};
