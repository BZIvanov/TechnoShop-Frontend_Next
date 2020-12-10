const express = require('express');
const { authCheck, adminCheck } = require('../middlewares/auth');
const { create, read } = require('../controllers/product');

const router = express.Router();

router.post('/product', authCheck, adminCheck, create);
router.get('/products', read);

module.exports = router;
