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

  const session = await Session.findOne({ accessToken: accessToken.trim() });

  if (!session) {
    return next(createHttpError(401, 'Session not found successfully'));
  }

  if (new Date() > session.accessTokenValidUntil) {
    return next(createHttpError(401, 'Access token is expired'));
  }

  const user = await User.findById(session.userId);
  // console.log('User ID from session:', session.userId.toString());
  if (user) {
    req.user = { name: user.name, id: user._id };
    console.log(req.user);
  }
  return next(createHttpError(401, 'User not found'));
  next();
};
