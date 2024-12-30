import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import httpStatus from 'http-status';

const userBlockIntoDB = async (id: string) => {
  // check user id is valid or not
  const userById = await User.findById(id);

  if (!userById) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const updateUser = await User.findOneAndUpdate(
    { _id: id },
    { $set: { isBlocked: true } },
    { new: true },
  );

  return updateUser;
};

export const AdminService = {
  userBlockIntoDB,
};
