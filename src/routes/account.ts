import express from 'express';
import * as AccountController from '../controllers/account';
const router = express.Router();

router.get('', AccountController.getAccount);
router.post('password', AccountController.postResetPassword);

export default router;
