import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminService } from './admin.service';

const userBlock = catchAsync(async (req, res) => {
  const { id } = req.params;

  await AdminService.userBlockIntoDB(id);

  sendResponse(res, {
    success: true,
    message: 'User blocked successfully',
    statusCode: 200,
  });
});

export const AdminController = {
  userBlock,
};
