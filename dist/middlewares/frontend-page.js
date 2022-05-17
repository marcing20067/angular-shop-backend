"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const FRONTEND_PATH = path_1.default.join(__dirname, '..', 'www', 'index.html');
const FrontendPage = (req, res, next) => {
    var _a;
    const accept = (_a = req.headers.accept) === null || _a === void 0 ? void 0 : _a.split(',');
    if (accept && accept.includes('text/html')) {
        res.sendFile(FRONTEND_PATH);
        return;
    }
    next();
};
exports.default = FrontendPage;
