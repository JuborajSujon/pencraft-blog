import { Router } from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middleware/validateRequest';
import { createBlogValidationSchema } from './blog.validation';
import { BlogController } from './blog.controller';

const router = Router();

router.post(
  '/blogs',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(createBlogValidationSchema),
  BlogController.createBlog,
);

export const BlogRoutes = router;
