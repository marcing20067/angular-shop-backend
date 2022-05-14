"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthMiddleware = (req, res, next) => {
    var _a;
    try {
        const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!accessToken) {
            const err = new Error();
            err.errorMessage = 'No token included.';
            err.statusCode = 400;
            throw err;
        }
        const payload = jsonwebtoken_1.default.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        req.userData = payload;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.default = AuthMiddleware;
