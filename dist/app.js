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
const auth_1 = __importDefault(require("./routes/auth"));
const account_1 = __importDefault(require("./routes/account"));
const body_parser_1 = __importDefault(require("body-parser"));
const error_1 = __importDefault(require("./middlewares/error"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, morgan_1.default)('dev'));
app.use(body_parser_1.default.json());
app.use('*', (req, res, next) => {
    var _a;
    const accept = (_a = req.headers.accept) === null || _a === void 0 ? void 0 : _a.split(',');
    if (accept === null || accept === void 0 ? void 0 : accept.includes('text/html')) {
        res.sendFile(path_1.default.join(__dirname, '..', 'www', 'index.html'));
        console.log('yup');
    }
});
app.use('/products', products_1.default);
app.use('/account', account_1.default);
app.use('/auth', auth_1.default);
app.use('', express_1.default.static('images'));
app.use(error_1.default);
db_1.default.then(() => {
    app.listen(port);
}).catch();
