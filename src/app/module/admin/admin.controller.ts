import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminService } from './admin.service';
import httpStatus from 'http-status';

const userBlock = catchAsync(async (req, res) => {
  const { id } = req.params;

  await AdminService.userBlockIntoDB(id);

  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: httpStatus.OK,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  await AdminService.deleteBlogIntoDB(id);

  sendResponse(res, {
    success: true,
    message: 'Blog deleted successfully',
    statusCode: httpStatus.OK,
  });
});

export const AdminController = {
  userBlock,
  deleteBlog,
};
