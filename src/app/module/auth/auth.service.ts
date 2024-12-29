import AuthenticationError from '../../errors/AuthenticationError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import httpStatus from 'http-status';
import config from '../../config';
import { createToken } from './auth.utils';

const loginUser = async (payload: ILoginUser) => {
  //isexist user
  const user = await User.findOne({ email: payload.email }).select('+password');

  if (!user) {
    throw new AuthenticationError(
      httpStatus.UNAUTHORIZED,
      'Invalid Credentials',
      'User not found with this email',
    );
  }

  // check if user is blocked
  await User.isUserBlocked(payload.email);

  // check password matched
  const isPasswordMatched = await User.isPasswordMatched(
    payload.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new AuthenticationError(
      httpStatus.UNAUTHORIZED,
      'Invalid Credentials',
      'Invalid password',
    );
  }

  const jwtPayload = {
    userEmail: user?.email as string,
    role: user?.role as string,
    name: user?.name as string,
  };

  // create token and send to the client

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return { accessToken };
};

export const AuthService = {
  loginUser,
};
