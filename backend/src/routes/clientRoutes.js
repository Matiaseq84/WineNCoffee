// backend/src/routes/clientRoutes.js
import express from "express";
import { getClients } from "../controllers/clientController.js";

const router = express.Router();

router.get("/", getClients);

export default router;
