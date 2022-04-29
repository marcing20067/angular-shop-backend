import dotenv from 'dotenv';
dotenv.config({ path: 'env/.env' });
import express from 'express';
import db from './utils/db';
import ProductsRouter from './routes/products';
import bodyParser from 'body-parser';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 3000;
app.use(
  cors({
    origin: 'http://localhost:4200',
  })
);

app.use(bodyParser.json());
app.use('/products', ProductsRouter);
app.use('', express.static('images'));

db.then(() => {
  app.listen(port);
}).catch();
