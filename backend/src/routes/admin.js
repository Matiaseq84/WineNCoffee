import express from 'express';
import { supabase } from '../config/db.js';
import bcrypt from "bcryptjs";

const router = express.Router();



let admin_data =[{
    "admin_id": "1",
    "user_name": "admin",
    "password": "1234"
}, 
{
    "admin_id": "2",
    "user_name": "ivan",
    "password": "1234"
}]

//rutas de administrador
router.get('/', function(req, res){
    res.json(admin_data);
});

export default router;