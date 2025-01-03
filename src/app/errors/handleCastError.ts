import mongoose from 'mongoose';
import {
  TErrorSource,
  TGenericErrorResponse,
} from '../interface/error.interface';

const handleCastError = (
  error: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSource = [
    {
      path: error?.path,
      message: error?.message,
    },
  ];
  const statusCode = 400;

  return {
    statusCode,
    message: 'CastError - Invalid Id',
    errorSources,
  };
};

export default handleCastError;
