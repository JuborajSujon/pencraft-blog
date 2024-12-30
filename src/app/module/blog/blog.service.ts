import { JwtPayload } from 'jsonwebtoken';
import { IBlog } from './blog.interface';
import { Blog } from './blog.model';

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

export const BlogService = {
  createBlogIntoDB,
};
