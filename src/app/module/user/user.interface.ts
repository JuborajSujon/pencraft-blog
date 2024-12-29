type Role = 'user' | 'admin';
export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: Role;
  isBlocked?: boolean;
}
