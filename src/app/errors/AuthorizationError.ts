class AuthorizationError extends Error {
  public statusCode: number;
  public details: string;

  constructor(
    statusCode: number,
    details: string,
    message: string,
    stack = '',
  ) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AuthorizationError;
