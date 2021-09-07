const express = require('express');
const { authCheck, adminCheck } = require('../middlewares/auth');
const {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  removeProduct,
  rateProduct,
  listSimilarProducts,
} = require('../controllers/product');

const router = express.Router();

router.get('/product', listProducts);
router.get('/product/:slug', getProduct);
router.post('/product', authCheck, adminCheck, createProduct);
router.put('/product/:slug', authCheck, adminCheck, updateProduct);
router.delete('/product/:slug', authCheck, adminCheck, removeProduct);
router.put('/product/:id/rate', authCheck, rateProduct);
router.get('/product/:id/similar', listSimilarProducts);

module.exports = router;
