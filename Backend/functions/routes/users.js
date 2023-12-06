const express = require('express');
const router = express.Router();
const userController = require('../controllers/users_controller');

router.get('/', (req, res) => {
    return res.send(' Inside the router');
});


router.get('/jwt-verification', userController.jwtVerification);

module.exports = router;