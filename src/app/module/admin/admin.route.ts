import { Router } from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { AdminController } from './admin.controller';

const router = Router();

router.patch(
  '/users/:id/block',
  auth(USER_ROLE.admin),
  AdminController.userBlock,
);

router.delete('/blogs/:id', auth(USER_ROLE.admin), AdminController.deleteBlog);

export const AdminRoutes = router;
