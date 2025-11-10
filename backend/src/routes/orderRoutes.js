// routes/orderRoutes.js
import express from 'express';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} from '../controllers/orderController.js';

const router = express.Router();

// Crear orden
router.post('/', createOrder);

// Obtener todas las órdenes
router.get('/', getOrders);

// Obtener una orden por ID
router.get('/:id', getOrderById);

// Actualizar estado
router.put('/:id/status', updateOrderStatus);

export default router;
