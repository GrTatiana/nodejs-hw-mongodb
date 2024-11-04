import createHttpError from 'http-errors';
import {
  loginUser,
  logoutUser,
  registerUser,
  userRefreshSession,
} from '../services/auth.js';
import { setUpSession } from '../utils/setUpSession.js';

export const userRegisterController = async (req, res) => {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const regUser = await registerUser(payload);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: regUser,
  });
};

export const userLoginController = async (req, res) => {
  const { email, password } = req.body;
  const session = await loginUser(email, password);
  setUpSession(res, session);
  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};

export const userRefreshSessionController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies || {};
  if (!sessionId || !refreshToken) {
    return res
      .status(400)
      .json({ message: 'Missing sessionId or refreshToken' });
  }
  const session = await userRefreshSession(sessionId, refreshToken);
  console.log(session);

  setUpSession(res, session);
  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
};

export const userLogoutController = async (req, res) => {
  const { sessionId } = req.cookies || {};
  if (typeof sessionId === 'string') {
    await logoutUser(sessionId);
  }
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');
  res.status(204).end();
};
