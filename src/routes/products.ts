import express from 'express';
import * as ProductsController from '../controllers/products';
import fileUpload from '../middlewares/file-upload';
const router = express.Router();

router.post('', fileUpload, ProductsController.postProduct);
router.get('', ProductsController.getProducts);
router.get(':id', ProductsController.getProduct);

export default router;
