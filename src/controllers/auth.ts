import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import bcryptjs from 'bcryptjs';
import { CustomError } from '../helpers/custom-error';
import jwt from 'jsonwebtoken';
import { UserData } from '../models/user-data';
import { setRefreshToken, createTokens } from '../helpers/token';

export const postLogin = async (
  req: Request<{}, { accessToken: string }, User>,
  res: Response<{ accessToken: string }>,
  next: NextFunction
) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      const error: CustomError = new Error();
      error.errorMessage = 'Wrong request data.';
      error.statusCode = 400;
      throw error;
    }
    const isPasswordCorrect = await bcryptjs.compare(username, user.username);
    if (!isPasswordCorrect) {
      return;
    }

    const { accessToken, refreshToken } = createTokens({ _id: user._id! });
    setRefreshToken(res, refreshToken);

    res.send({
      accessToken,
    });

    return;
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
    res.status(201).send({});
  } catch (err) {
    next(err);
  }
};

export const postRefresh = async (
  req: Request,
  res: Response<{ accessToken: string }>,
  next: NextFunction
) => {
  try {
    const oldRefreshToken = req.cookies.refresh;
    const oldAccessToken = req.headers.authorization?.split(' ')[1];
    if (!oldAccessToken || !oldRefreshToken) {
      const err: CustomError = new Error();
      err.errorMessage = 'No token included.';
      err.statusCode = 400;
      throw err;
    }

    const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;
    const accessPayload = jwt.verify(oldRefreshToken, JWT_ACCESS_SECRET!);
    const refreshPayload = jwt.verify(oldAccessToken, JWT_REFRESH_SECRET!);

    const { accessToken, refreshToken } = createTokens(
      accessPayload as UserData
    );
    setRefreshToken(res, refreshToken);
    res.send({
      accessToken,
    });
  } catch (err) {
    next(err);
  }
};
