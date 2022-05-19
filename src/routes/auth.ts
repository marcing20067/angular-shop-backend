import express from 'express';
import * as AuthController from '../controllers/auth';
const router = express.Router();

router.get('/login', AuthController.postLogin);

export default router;
