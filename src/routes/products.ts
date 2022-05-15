import express from 'express';
import * as ProductsController from '../controllers/products';
import fileUpload from '../middlewares/file-upload';
import AuthMiddleware from '../middlewares/auth';
const router = express.Router();

router.post('', AuthMiddleware, fileUpload, ProductsController.postProduct);
router.get('', ProductsController.getProducts);
router.get('/:id', ProductsController.getProduct);

export default router;
