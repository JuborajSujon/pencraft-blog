import { JwtPayload } from 'jsonwebtoken';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import { BlogSearchableFields } from './blog.constant';

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
  });

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found with this id');
  }

  // check user is author of blog or not
  if (user._id.toString() !== blog.author.toString()) {
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

const deleteBlogIntoDB = async (id: string, user: JwtPayload) => {
  // check user is admin and author of blog or not
  const blog = await Blog.findOne({
    _id: id,
  });

  if (!blog) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found');
  }

  if (user.role === 'admin') {
    await Blog.findByIdAndDelete(id);
  }

  // check user is author of blog or not
  if (user._id.toString() !== blog.author.toString()) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "You don't have permission to delete this blog",
    );
  }

  await Blog.findByIdAndDelete(id);
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(Blog.find(), query)
    .search(BlogSearchableFields)
    .filter()
    .sort()
    .paginate();

  const result = await blogQuery.modelQuery
    .populate('author', 'name email role')
    .select('-isPublished -createdAt -updatedAt');
  return result;
};
export const BlogService = {
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogIntoDB,
  getAllBlogsFromDB,
};
