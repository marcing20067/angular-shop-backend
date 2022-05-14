"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRefreshToken = exports.createTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createTokens = (payload) => {
    const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, JWT_ACCESS_AGE, JWT_REFRESH_AGE, } = process.env;
    const accessToken = jsonwebtoken_1.default.sign(payload, JWT_ACCESS_SECRET, {
        expiresIn: JWT_ACCESS_AGE,
    });
    const refreshToken = jsonwebtoken_1.default.sign(payload, JWT_REFRESH_SECRET, {
        expiresIn: JWT_REFRESH_AGE,
    });
    return {
        accessToken,
        refreshToken,
    };
};
exports.createTokens = createTokens;
const setRefreshToken = (res, refreshToken) => {
    const { JWT_REFRESH_AGE } = process.env;
    res.cookie('refresh', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: +JWT_REFRESH_AGE,
    });
};
exports.setRefreshToken = setRefreshToken;
