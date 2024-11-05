import { THIRTY_DAY } from '../../index.js';

export const setUpSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAY),
    secure: true,
    sameSite: 'none',
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + THIRTY_DAY),
    secure: true,
    sameSite: 'none',
  });
};
