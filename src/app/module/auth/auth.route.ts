import { Router } from 'express';
import { UserController } from '../user/user.controller';

const router = Router();

router.post('/register', UserController.createUser);

export const AuthRoutes = router;
