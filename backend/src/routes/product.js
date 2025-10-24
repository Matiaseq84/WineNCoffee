import express from 'express';

const router = express.Router();

let products_list = [
    {
        "product_id" : "1",
        "name" : "café torrado",
        "description" : "café molido",
        "photo" : "/photo/foto_1.jpg",
        "thumbnail" : "thumbnails/thumbnail_1.jpg",
        "price" : "1200",
        "category" : "café",
        "subcategory" : "molido",
        "stock" : "7"
    }
]

//rutas de productos
router.get('/', function(req, res){
    res.json(products_list);
});

export default router;