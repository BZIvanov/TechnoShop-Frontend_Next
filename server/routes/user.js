const express = require('express');
const { authCheck } = require('../middlewares/auth');
const {
  getUserCart,
  saveUserCart,
  emptyUserCart,
  saveAddress,
  applyCouponToUserCart,
  createOrder,
  createCashOrder,
  orders,
  addToWishlist,
  wishlist,
  removeFromWishlist,
} = require('../controllers/user');

const router = express.Router();

router.get('/user/cart', authCheck, getUserCart);
router.post('/user/cart', authCheck, saveUserCart);
router.delete('/user/cart', authCheck, emptyUserCart);
router.post('/user/address', authCheck, saveAddress);
router.post('/user/cart/coupon', authCheck, applyCouponToUserCart);
router.post('/user/order', authCheck, createOrder);
router.post('/user/cash-order', authCheck, createCashOrder);
router.get('/user/orders', authCheck, orders);
router.post('/user/wishlist', authCheck, addToWishlist);
router.get('/user/wishlist', authCheck, wishlist);
router.put('/user/wishlist/:productId', authCheck, removeFromWishlist);

module.exports = router;
