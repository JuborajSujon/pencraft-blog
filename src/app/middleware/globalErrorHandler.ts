import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import config from '../config';
import { TErrorSource } from '../interface/error.interface';
import { ZodError } from 'zod';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500;
  const message = err.message || 'Something went wrong';

  const errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedErrors = 
  }

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
