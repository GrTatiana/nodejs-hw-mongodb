// import { Router } from 'express';
import express from 'express';
import {
  requestResetPasswordSchema,
  resetPasswordSchema,
  userLoginSchema,
  usersRegisterSchema,
} from '../validation/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  userLoginController,
  userLogoutController,
  userRegisterController,
  userRefreshSessionController,
  resetPasswordController,
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
usersRouter.post(
  '/send-reset-email',
  validateBody(requestResetPasswordSchema),
  ctrlWrapper(sendResetEmailController),
);
usersRouter.post(
  '/reset-pwd',
  jsonParser,
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);
export default usersRouter;
