import { FIFTEEN_MINUTES, THIRTY_DAY } from '../../index.js';
import { randomBytes } from 'node:crypto';
import { Session } from '../models/sessionSchema.js';

export const createSession = async (userId) => {
  const accessToken = randomBytes(40).toString('hex');
  const refreshToken = randomBytes(40).toString('hex');
  const accessTokenValidUntil = new Date(Date.now() + FIFTEEN_MINUTES);
  const refreshTokenValidUntil = new Date(Date.now() + THIRTY_DAY);
  const session = new Session({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });
  return session;
};
