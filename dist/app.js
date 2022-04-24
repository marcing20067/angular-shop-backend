"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: 'env/.env' });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./utils/db"));
const app = (0, express_1.default)();
const port = 3000 || process.env.PORT;
db_1.default.then(() => {
    app.listen(port);
}).catch();
