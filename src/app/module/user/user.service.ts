import { IUser } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (payload: IUser) => {
  const result = await UserModel.create(payload);
  return result;
};

export const UserService = {
  createUserIntoDB,
};
