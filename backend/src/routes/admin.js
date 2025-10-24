import express from 'express';
import { getAdmins } from '../controllers/adminController.js';

const router = express.Router();

router.get('/', getAdmins);

export default router;