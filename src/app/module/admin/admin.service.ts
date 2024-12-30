import AppError from '../../errors/AppError';
import { Blog } from '../blog/blog.model';
import { User } from '../user/user.model';
import httpStatus from 'http-status';

const userBlockIntoDB = async (id: string) => {
  // check user id is valid or not
  const updateUser = await User.findOneAndUpdate(
    { _id: id },
    { $set: { isBlocked: true } },
    { new: true },
  );

  if (!updateUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  return updateUser;
};

const deleteBlogIntoDB = async (id: string) => {
  // check blog id is valid or not
  const blogById = await Blog.findById(id);

  if (!blogById) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  await Blog.findByIdAndDelete(id);
};

export const AdminService = {
  userBlockIntoDB,
  deleteBlogIntoDB,
};
