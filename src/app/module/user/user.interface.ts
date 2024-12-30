/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

type Role = 'user' | 'admin';
export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: Role;
  isBlocked?: boolean;
}

export interface UserModel extends Model<IUser> {
  isUserBlocked(id: string): Promise<IUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
