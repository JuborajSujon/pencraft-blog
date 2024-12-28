import { ErrorRequestHandler } from 'express';
import config from '../config';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  const statusCode = 500;
  const message = err.message || 'Something went wrong';

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error: {
      details: err || message,
    },
    stack: config.node_env === 'development' ? err?.stack : null,
  });
};
