import { Router } from 'express';
import { AuthRoutes } from '../module/auth/auth.route';
import { BlogRoutes } from '../module/blog/blog.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  // {
  //   path: '/users',
  //   route: UserRoutes,
  // },
  // {
  //   path: '/admins',
  //   route: AdminRoutes,
  // },
  {
    path: '',
    route: BlogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
