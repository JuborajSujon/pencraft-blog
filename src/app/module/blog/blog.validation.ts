import { z } from 'zod';

const createBlogValidationSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters long'),
  content: z.string().min(30, 'Content must be at least 30 characters long'),
});

const updateBlogValidationSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
});

export const BlogValidation = {
  createBlogValidationSchema,
  updateBlogValidationSchema,
};
