import dotenv from 'dotenv';
dotenv.config({ path: 'env/.env' });
import express from 'express';
import db from './utils/db';
import ProductsRouter from './routes/products';
import AuthRouter from './routes/auth';
import AccountRouter from './routes/account';
import bodyParser from 'body-parser';
import ErrorHandler from './middlewares/error';
import morgan from 'morgan';

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use('/products', ProductsRouter);
app.use('/account', AccountRouter);
app.use('/auth', AuthRouter);
app.use('', express.static('images'));
app.use(ErrorHandler);
db.then(() => {
  app.listen(port);
}).catch();
