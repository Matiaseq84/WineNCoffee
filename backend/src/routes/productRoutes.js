import express from 'express';
import { getProducts } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);

// falta la prueba del controlador de productos

export default router;