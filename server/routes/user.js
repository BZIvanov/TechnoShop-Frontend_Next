const express = require('express');
const { authCheck } = require('../middlewares/auth');
const { userCart } = require('../controllers/user');

const router = express.Router();

router.post('/user/cart', authCheck, userCart);

module.exports = router;
