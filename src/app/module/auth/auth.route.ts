import { Router } from 'express';
import { UserController } from '../user/user.controller';
import validateRequest from '../../middleware/validateRequest';
import { registerUserValidationSchema } from '../user/user.validation';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';

const router = Router();

router.post(
  '/register',
  validateRequest(registerUserValidationSchema),
  UserController.createUser,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
