import { IUser } from './user.interface';
import { UserModel } from './user.model';

// create user
const createUserIntoDB = async (payload: IUser) => {
  const result = await UserModel.create(payload);

  const { _id, name, email } = result;
  return { _id, name, email };
};

export const UserService = {
  createUserIntoDB,
};
