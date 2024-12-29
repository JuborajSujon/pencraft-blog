import AppError from '../../errors/AppError';
import { IUser } from './user.interface';
import { UserModel } from './user.model';
import httpStatus from 'http-status';

// create user
const createUserIntoDB = async (payload: IUser) => {
  //isexist user
  const isExistUser = await UserModel.findOne({
    email: payload.email,
  });

  if (isExistUser) {
    throw new AppError(httpStatus.CONFLICT, 'User already exist');
  }
  const result = await UserModel.create(payload);

  const { _id, name, email } = result;
  return { _id, name, email };
};

export const UserService = {
  createUserIntoDB,
};
