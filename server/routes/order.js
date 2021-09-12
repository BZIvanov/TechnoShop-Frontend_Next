const express = require('express');
const { authCheck } = require('../middlewares/auth');
const { createOrder } = require('../controllers/order');

const router = express.Router();

router.post('/order', authCheck, createOrder);

module.exports = router;
