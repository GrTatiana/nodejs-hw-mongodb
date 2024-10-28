import { Router } from 'express';
import { userLoginSchema, usersRegisterSchema } from '../validation/user.js';
import { validateBody } from '../middlewares/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  userLoginController,
  userLogoutController,
  userRegisterController,
} from '../controllers/auth.js';
// import { isValidId } from '../middlewares/isValidId.js';

const usersRouter = Router();
usersRouter.post(
  '/register',
  validateBody(usersRegisterSchema),
  ctrlWrapper(userRegisterController),
);

usersRouter.post(
  '/login',
  validateBody(userLoginSchema),
  ctrlWrapper(userLoginController),
);

usersRouter.post('/logout', ctrlWrapper(userLogoutController));

export default usersRouter;
