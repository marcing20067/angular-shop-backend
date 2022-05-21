"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRefresh = exports.postLogin = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_1 = require("../helpers/token");
const postLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        const user = yield user_1.default.findOne({ username });
        if (!user || user.username !== username) {
            const error = new Error();
            error.errorMessage = 'Wrong request data.';
            error.statusCode = 400;
            throw error;
        }
        const { accessToken, accessExpiresIn, refreshToken, refreshExpiresIn } = (0, token_1.createTokens)({ _id: user._id });
        (0, token_1.setRefreshToken)(res, refreshToken);
        res.send({
            accessToken,
            accessExpiresIn,
            refreshExpiresIn,
        });
        return;
    }
    catch (err) {
        next(err);
    }
});
exports.postLogin = postLogin;
const postRefresh = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const oldRefreshToken = req.cookies.refresh;
        const oldAccessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!oldAccessToken || !oldRefreshToken) {
            const err = new Error();
            err.errorMessage = 'No token included.';
            err.statusCode = 400;
            throw err;
        }
        const { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } = process.env;
        const accessPayload = jsonwebtoken_1.default.verify(oldRefreshToken, JWT_ACCESS_SECRET);
        const refreshPayload = jsonwebtoken_1.default.verify(oldAccessToken, JWT_REFRESH_SECRET);
        const { accessToken, accessExpiresIn, refreshToken, refreshExpiresIn } = (0, token_1.createTokens)(accessPayload);
        (0, token_1.setRefreshToken)(res, refreshToken);
        res.send({
            accessToken,
            accessExpiresIn,
            refreshExpiresIn,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.postRefresh = postRefresh;
