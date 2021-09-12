const express = require('express');
const { authCheck } = require('../middlewares/auth');
const {
  getUserWishlist,
  updateUserWishlist,
} = require('../controllers/wishlist');

const router = express.Router();

router.get('/wishlist', authCheck, getUserWishlist);
router.put('/wishlist/:productId', authCheck, updateUserWishlist);

module.exports = router;
