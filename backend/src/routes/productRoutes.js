import express from 'express';
import {
    getProducts, 
    searchProducts,
    getProductById, 
    postProduct, 
    updateProduct, 
    deleteProduct 
 } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);

router.get('/search', searchProducts);

router.get('/:id', getProductById);

router.post('/', postProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

export default router;