const express = require('express');
const { authCheck } = require('../middlewares/auth');
const { getUserCart, userCart, emptyCart } = require('../controllers/user');

const router = express.Router();

router.get('/user/cart', authCheck, getUserCart);
router.post('/user/cart', authCheck, userCart);
router.delete('/user/cart', authCheck, emptyCart);

module.exports = router;
