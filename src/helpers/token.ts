import { UserData } from '../models/user-data';
import { Response } from 'express';
import jwt from 'jsonwebtoken';

export const createTokens = (payload: UserData) => {
  const {
    JWT_ACCESS_SECRET,
    JWT_REFRESH_SECRET,
    JWT_ACCESS_AGE,
    JWT_REFRESH_AGE,
  } = process.env;

  const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET!, {
    expiresIn: JWT_ACCESS_AGE,
  });
  const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET!, {
    expiresIn: JWT_REFRESH_AGE,
  });

  return {
    accessToken,
    accessExpiresIn: +JWT_ACCESS_AGE!,
    refreshToken,
    refreshExpiresIn: +JWT_REFRESH_AGE!,
  };
};

export const setRefreshToken = (res: Response, refreshToken: string) => {
  const { JWT_REFRESH_AGE } = process.env;

  res.cookie('refresh', refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: +JWT_REFRESH_AGE!,
  });
};
