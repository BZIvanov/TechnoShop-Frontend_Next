const express = require('express');
const { authCheck } = require('../middlewares/auth');
const {
  updateUser,
  getUserCart,
  saveUserCart,
  emptyUserCart,
  applyCouponToUserCart,
  createCashOrder,
  orders,
  addToWishlist,
  wishlist,
  removeFromWishlist,
} = require('../controllers/user');

const router = express.Router();

router.put('/user', authCheck, updateUser);
router.get('/user/cart', authCheck, getUserCart);
router.post('/user/cart', authCheck, saveUserCart);
router.put('/user/cart', authCheck, applyCouponToUserCart);
router.delete('/user/cart', authCheck, emptyUserCart);
router.post('/user/cash-order', authCheck, createCashOrder);
router.get('/user/orders', authCheck, orders);
router.post('/user/wishlist', authCheck, addToWishlist);
router.get('/user/wishlist', authCheck, wishlist);
router.put('/user/wishlist/:productId', authCheck, removeFromWishlist);

module.exports = router;
