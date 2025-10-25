import express from 'express';
import {
    getAdmins, 
    getAdminById, 
    postAdmin, 
    updateAdmin, 
    deleteAdmin 
 } from '../controllers/adminController.js';

const router = express.Router();

router.get('/', getAdmins);

router.get('/:id', getAdminById);

router.post('/', postAdmin);

router.put('/:id', updateAdmin);

router.delete('/:id', deleteAdmin);

export default router;