import { Router } from 'express';
import { UserController } from '../user/user.controller';
import validateRequest from '../../middleware/validateRequest';
import { registerUserValidationSchema } from '../user/user.validation';

const router = Router();

router.post(
  '/register',
  validateRequest(registerUserValidationSchema),
  UserController.createUser,
);

export const AuthRoutes = router;
