import express from 'express';
import * as AccountController from '../controllers/account';
const router = express.Router();
import AuthMiddleware from '../middlewares/auth';

router.post('/pay', AuthMiddleware, AccountController.postPay);

export default router;