const express = require('express');
const { authCheck, adminCheck } = require('../middlewares/auth');
const { create } = require('../controllers/product');

const router = express.Router();

router.post('/product', authCheck, adminCheck, create);

module.exports = router;
