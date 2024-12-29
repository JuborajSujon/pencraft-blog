import { model, Schema } from 'mongoose';
import { IUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please provide a valid email address',
      ],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// password hashing funciton
userSchema.pre('save', async function (next) {
  const user = this as IUser;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

// set password to empty string after saving to db
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// check user is blocked
userSchema.statics.isUserBlocked = async function (email: string) {
  const user = await this.findOne({ email });

  if (user?.isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  return user;
};

// check password
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<IUser>('User', userSchema);
