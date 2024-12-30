import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { BlogService } from './blog.service';
import { JwtPayload } from 'jsonwebtoken';

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogService.createBlogIntoDB(
    req.body,
    req.user as JwtPayload,
  );
  sendResponse(res, {
    success: true,
    message: 'Blog created successfully',
    statusCode: httpStatus.CREATED,
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const resutl = await BlogService.updateBlogIntoDB(
    req.params.id,
    req.body,
    req.user as JwtPayload,
  );

  sendResponse(res, {
    success: true,
    message: 'Blog updated successfully',
    statusCode: httpStatus.OK,
    data: resutl,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  await BlogService.deleteBlogIntoDB(req.params.id, req.user as JwtPayload);

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
  });
});

export const BlogController = {
  createBlog,
  updateBlog,
  deleteBlog,
};
