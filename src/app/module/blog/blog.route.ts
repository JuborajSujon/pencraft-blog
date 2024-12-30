import { Router } from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../../middleware/validateRequest';
import { BlogValidation } from './blog.validation';
import { BlogController } from './blog.controller';

const router = Router();

router.post(
  '/blogs',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(BlogValidation.createBlogValidationSchema),
  BlogController.createBlog,
);

router.patch(
  '/blogs/:id',
  auth(USER_ROLE.user),
  validateRequest(BlogValidation.updateBlogValidationSchema),
  BlogController.updateBlog,
);

router.delete(
  '/blogs/:id',
  auth(USER_ROLE.user, USER_ROLE.admin),
  BlogController.deleteBlog,
);

router.get('/blogs', BlogController.getAllBlogs);

export const BlogRoutes = router;
