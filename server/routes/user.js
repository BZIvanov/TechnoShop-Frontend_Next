const express = require('express');
const { authCheck } = require('../middlewares/auth');
const {
  getUserCart,
  userCart,
  emptyCart,
  saveAddress,
} = require('../controllers/user');

const router = express.Router();

router.get('/user/cart', authCheck, getUserCart);
router.post('/user/cart', authCheck, userCart);
router.delete('/user/cart', authCheck, emptyCart);
router.post('/user/address', authCheck, saveAddress);

module.exports = router;
