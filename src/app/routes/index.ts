import { Router } from 'express';
import { AuthRoutes } from '../module/auth/auth.route';

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
  // {
  //   path: '/blog',
  //   route: BlogRoutes,
  // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
