import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import config from '../config';
import { TErrorSource } from '../interface/error.interface';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = err.message || 'Something went wrong';

  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedErrors = handleZodError(err);

    statusCode = simplifiedErrors?.statusCode;
    message = simplifiedErrors?.message;
    errorSources = simplifiedErrors?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedErrors = handleValidationError(err);

    statusCode = simplifiedErrors?.statusCode;
    message = simplifiedErrors?.message;
    errorSources = simplifiedErrors?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedErrors = handleCastError(err);

    statusCode = simplifiedErrors?.statusCode;
    message = simplifiedErrors?.message;
    errorSources = simplifiedErrors?.errorSources;
  } else if (err?.code === 11000) {
    const simplifiedErrors = handleDuplicateError(err);

    statusCode = simplifiedErrors?.statusCode;
    message = simplifiedErrors?.message;
    errorSources = simplifiedErrors?.errorSources;
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error: {
      details: errorSources || message,
    },
    stack: config.node_env === 'development' ? err?.stack : null,
  });
};
