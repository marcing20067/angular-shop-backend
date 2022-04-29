"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: 'env/.env' });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./utils/db"));
const products_1 = __importDefault(require("./routes/products"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    origin: 'http://localhost:4200',
}));
app.use(body_parser_1.default.json());
app.use('/products', products_1.default);
app.use('', express_1.default.static('images'));
db_1.default.then(() => {
    app.listen(port);
}).catch();
