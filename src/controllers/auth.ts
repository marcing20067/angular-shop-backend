import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import bcryptjs from 'bcryptjs';
import { CustomError } from '../helpers/custom-error';

export const postLogin = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      const isPasswordCorrect = await bcryptjs.compare(username, user.username);
      if (isPasswordCorrect) {
        res.send({});
        return;
      }
    }
    const error: CustomError = new Error();
    error.errorMessage = 'Wrong request data.';
    error.statusCode = 400;
    throw error;
  } catch (err) {
    next(err);
  }
};

export const postSignup = async (
  req: Request<{}, {}, User>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
    });
    const createdUser = await user.save();
    res.status(201).send({})
  } catch (err) {
    next(err);
  }
};
