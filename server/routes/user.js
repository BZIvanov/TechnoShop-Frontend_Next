const express = require('express');
const { authCheck } = require('../middlewares/auth');
const {
  updateUser,
  getUserCart,
  saveUserCart,
  emptyUserCart,
  applyCouponToUserCart,
  createCashOrder,
} = require('../controllers/user');

const router = express.Router();

router.put('/user', authCheck, updateUser);
router.get('/user/cart', authCheck, getUserCart);
router.post('/user/cart', authCheck, saveUserCart);
router.put('/user/cart', authCheck, applyCouponToUserCart);
router.delete('/user/cart', authCheck, emptyUserCart);
router.post('/user/cash-order', authCheck, createCashOrder);

module.exports = router;
