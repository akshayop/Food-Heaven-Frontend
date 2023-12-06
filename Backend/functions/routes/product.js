const express = require('express');
const router = express.Router();
const productController = require('../controllers/products_controller');

router.post('/create-product', productController.createProduct);
router.get('/show-products', productController.showProducts);


module.exports = router;