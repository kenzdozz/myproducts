import express from 'express';
import ProductController from '../controllers/ProductController';
import multerUpload from '../middlewares/multerUpload';
import validateInputs from '../middlewares/validateInputs';
import { productRules } from '../middlewares/validationRules';

const router = express.Router();


router.delete('/products/:id', ProductController.delete);
router.patch('/products/:id', multerUpload('image', false), ProductController.update);
router.get('/products/:id', ProductController.getOne);
router.post('/products', multerUpload('image'), validateInputs(productRules), ProductController.create);
router.get('/products', ProductController.getAll);

export default router;
