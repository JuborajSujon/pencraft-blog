import { z } from 'zod';

export const createBlogValidationSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters long'),
  content: z.string().min(30, 'Content must be at least 30 characters long'),
});

export const BlogValidation = {
  createBlogValidationSchema,
};
