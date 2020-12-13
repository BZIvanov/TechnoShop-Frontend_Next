const express = require('express');
const { authCheck, adminCheck } = require('../middlewares/auth');
const { create, listAll } = require('../controllers/product');

const router = express.Router();

router.post('/product', authCheck, adminCheck, create);
router.get('/products/:count', listAll);

module.exports = router;
