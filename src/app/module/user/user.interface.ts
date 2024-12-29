/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

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
