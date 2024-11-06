import createHttpError from 'http-errors';
import { User } from '../models/userSchema.js';
import { Session } from '../models/sessionSchema.js';

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;

  if (typeof authorization !== 'string') {
    return next(createHttpError(401, 'Please provide access token'));
  }
  const [bearer, accessToken] = authorization.split(' ');

  if (bearer !== 'Bearer' || typeof accessToken !== 'string') {
    return next(createHttpError(401, 'Please provide access token'));
  }
  const session = await Session.findOne({ accessToken });
  if (!session) {
    return next(createHttpError(401, 'Session not found successfully'));
  }

  if (new Date() > session.accessTokenValidUntil) {
    return next(createHttpError(401, 'Access token is expired'));
  }
  const user = await User.findById(session.userId);
  if (user === null) {
    return next(createHttpError(401, 'Session not found'));
  }
  req.user = { _id: user._id, name: user.name };
  next();
};
