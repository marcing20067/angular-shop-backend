import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { CustomError } from '../helpers/custom-error';

const ErrorHandler: ErrorRequestHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode || 500).send({
    message: err.errorMessage || 'Unhandled error occurred.',
  });
};
export default ErrorHandler;
