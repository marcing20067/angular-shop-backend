import { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import { CustomError } from '../helpers/custom-error';
import jwt from 'jsonwebtoken';
import { UserData } from '../models/user-data';
import { setRefreshToken, createTokens } from '../helpers/token';

export const postLogin = async (
  req: Request<{}, { accessToken: string }, User>,
  res: Response<{
    accessToken: string;
    accessExpiresIn: number;
    refreshExpiresIn: number;
  }>,
  next: NextFunction
) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    if (!user || user.username !== username) {
      const error: CustomError = new Error();
      error.errorMessage = 'Wrong request data.';
      error.statusCode = 400;
      throw error;
    }

    const { accessToken, accessExpiresIn, refreshToken, refreshExpiresIn } =
      createTokens({ _id: user._id! });
    setRefreshToken(res, refreshToken);

    res.send({
      accessToken,
      accessExpiresIn,
      refreshExpiresIn,
    });

    return;
  } catch (err) {
    next(err);
  }
};

export const postRefresh = async (
  req: Request,
  res: Response<{
    accessToken: string;
    accessExpiresIn: number;
    refreshExpiresIn: number;
  }>,
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

    const { accessToken, accessExpiresIn, refreshToken, refreshExpiresIn } =
      createTokens(accessPayload as UserData);

    setRefreshToken(res, refreshToken);

    res.send({
      accessToken,
      accessExpiresIn,
      refreshExpiresIn,
    });
  } catch (err) {
    next(err);
  }
};
