import express from 'express';
import * as ProductsController from '../controllers/products';
const router = express.Router();

router.post('', ProductsController.postProduct);
router.get('', ProductsController.getProducts);
router.get(':id', ProductsController.getProduct);

export default router;
