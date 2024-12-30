import { NextFunction, Request, Response } from 'express';
import { TUserRole } from '../module/user/user.interface';
import catchAsync from '../utils/catchAsync';
import AuthorizationError from '../errors/AuthorizationError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../module/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const isToken = req.headers.authorization;

    if (!isToken) {
      throw new AuthorizationError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized',
        'No token found',
      );
    }

    const parts: string[] = isToken.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      throw new AuthorizationError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized',
        'Invalid token format. Expected "Bearer <token>"',
      );
    }

    const token = parts[1];

    // check if token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userEmail: email } = decoded;

    // check if the user exists
    const user = await User.findOne({ email });

    if (!user) {
      throw new AuthorizationError(
        httpStatus.UNAUTHORIZED,
        'Unauthorized',
        'User not found',
      );
    }

    // check if user is blocked
    if (user.isBlocked) {
      throw new AuthorizationError(
        httpStatus.FORBIDDEN,
        'Unauthorized',
        'User is blocked',
      );
    }

    // check if user has the required role
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AuthorizationError(
        httpStatus.FORBIDDEN,
        'Unauthorized',
        'You are not authorized',
      );
    }

    // decoded token
    req.user = user;

    next();
  });
};

export default auth;
