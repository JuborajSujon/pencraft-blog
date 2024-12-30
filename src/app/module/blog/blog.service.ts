import { JwtPayload } from 'jsonwebtoken';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createBlogIntoDB = async (payload: IBlog, user: JwtPayload) => {
  const blog = await Blog.create({
    ...payload,
    author: user._id,
  });

  const poplutedBlog = await Blog.findById(blog._id)
    .populate('author', 'name email role')
    .select('-isPublished -createdAt -updatedAt');

  return poplutedBlog;
};

const updateBlogIntoDB = async (
  id: string,
  payload: Partial<IBlog>,
  user: JwtPayload,
) => {
  const blog = await Blog.findOne({
    _id: id,
    author: user._id,
  });

  if (!blog) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You don't have permission to update this blog",
    );
  }

  Object.assign(blog, payload);
  await blog.save();

  const updateBlog = await Blog.findById(blog._id)
    .populate('author', 'name email role')
    .select('-isPublished -createdAt -updatedAt');

  return updateBlog;
};

export const BlogService = {
  createBlogIntoDB,
  updateBlogIntoDB,
};
