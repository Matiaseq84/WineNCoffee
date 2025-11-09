import express from 'express';
import { createCheckout } from "../controllers/checkoutController.js"

const router = express.Router();

// Ruta principal para el flujo del Checkout
router.post("/confirm", createCheckout);

export default router;