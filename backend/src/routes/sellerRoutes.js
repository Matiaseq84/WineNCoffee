// backend/src/routes/sellerRoutes.js
import express from "express";
import {
  postSeller,
  getSellers,
  getSellerById,
  updateSeller,
  deleteSeller,
} from "../controllers/sellerController.js";

const router = express.Router();

// POST - Crear seller
router.post("/", postSeller);

// GET - Listar sellers
router.get("/", getSellers);

// GET - Obtener seller por id
router.get("/:id", getSellerById);

// PUT - Actualizar seller
router.put("/:id", updateSeller);

// DELETE - Eliminar seller
router.delete("/:id", deleteSeller);

export default router;
