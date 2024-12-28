import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found',
    statusCode: httpStatus.NOT_FOUND,
    error: `Route ${req.originalUrl} Not Found`,
  });

  void next;
};

export default notFound;
