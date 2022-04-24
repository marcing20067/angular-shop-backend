import dotenv from 'dotenv';
dotenv.config({ path: 'env/.env' })
import express from "express";
import db from "./utils/db";
const app = express();
const port = 3000 || process.env.PORT;

db.then(() => {
  app.listen(port);
}).catch();
