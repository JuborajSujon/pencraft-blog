import { z } from 'zod';

export const createUserZodSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  email: z.string().email('Invalid email address'),
  password: z.string({
    required_error: 'Password is required',
  }),
  role: z.enum(['user', 'admin']).optional().default('user'),
  isBlocked: z.boolean().optional().default(false),
});
