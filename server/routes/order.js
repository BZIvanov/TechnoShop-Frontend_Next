const express = require('express');
const { authCheck } = require('../middlewares/auth');
const { listOrders, createOrder } = require('../controllers/order');

const router = express.Router();

router.get('/order', authCheck, listOrders);
router.post('/order', authCheck, createOrder);

module.exports = router;
