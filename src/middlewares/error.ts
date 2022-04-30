import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../helpers/custom-error';

const ErrorHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
  err: CustomError
) => {
  res
    .status(err.statusCode || 500)
    .send({
      message:
        err.errorMessage ||
        'Unhandled error occurred.',
    });
};
export default ErrorHandler;
