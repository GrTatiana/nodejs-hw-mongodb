// import { Router } from 'express';
import express from 'express';
import { userLoginSchema, usersRegisterSchema } from '../validation/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  userLoginController,
  userLogoutController,
  userRegisterController,
  userRefreshSessionController,
  sendResetEmailController,
} from '../controllers/auth.js';

const usersRouter = express.Router();
const jsonParser = express.json();

usersRouter.post(
  '/register',
  jsonParser,
  validateBody(usersRegisterSchema),
  ctrlWrapper(userRegisterController),
);

usersRouter.post(
  '/login',
  jsonParser,
  validateBody(userLoginSchema),
  ctrlWrapper(userLoginController),
);

usersRouter.post(
  '/refresh',
  jsonParser,
  validateBody(userLoginSchema),
  ctrlWrapper(userRefreshSessionController),
);

usersRouter.post('/logout', ctrlWrapper(userLogoutController));

export default usersRouter;
