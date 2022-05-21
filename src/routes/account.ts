import express from 'express';
import * as AccountController from '../controllers/account';
const router = express.Router();
import AuthMiddleware from '../middlewares/auth';

router.post('/pay', AccountController.postPay);
router.get('', AuthMiddleware, AccountController.getAccount);

export default router;
