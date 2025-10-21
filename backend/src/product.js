import express from 'express';

const router = express.Router();

//rutas de productos
router.get('/', function(req, res){
    res.send('lista de productos');
});

export default router;