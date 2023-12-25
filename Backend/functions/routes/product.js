const express = require('express');
const router = express.Router();
const productController = require('../controllers/products_controller');

router.post('/create-product', productController.createProduct);
router.get('/show-products', productController.showProducts);   
router.delete('/delete/:productId', productController.deletingProduct);  
router.post('/add-to-cart/:userId', productController.addToCart);
router.get('/get-cart-items/:userId', productController.getCartItem);
router.post('/update-cart/:userId', productController.updateCart);
router.post('/create-checkout-session', productController.createCheckout);
router.post('/webhook', express.raw({type: 'application/json'}), productController.webHook);
router.get('/orders', productController.orderDetails);
router.post("/update-orders/:orderId", productController.updateOrder)

module.exports = router;