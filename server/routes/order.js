const express = require('express');
const { authCheck, adminCheck } = require('../middlewares/auth');
const {
  listOrders,
  createOrder,
  updateOrder,
} = require('../controllers/order');

const router = express.Router();

router.get('/order', authCheck, listOrders);
router.post('/order', authCheck, createOrder);
router.put('/order/:id', authCheck, adminCheck, updateOrder);

module.exports = router;
