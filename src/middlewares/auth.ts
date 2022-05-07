import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomError } from '../helpers/custom-error';
import { UserData } from '../models/user-data';

declare global {
  namespace Express {
    interface Request {
      userData?: UserData;
    }
  }
}

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) {
      const err: CustomError = new Error();
      err.errorMessage = 'No token included.';
      err.statusCode = 400;
      throw err;
    }
    const payload = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!);
    req.userData = payload as UserData;
    next();
  } catch (err) {
    next(err);
  }
};

export default AuthMiddleware;
