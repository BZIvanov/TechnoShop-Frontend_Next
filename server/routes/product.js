const express = require('express');
const { authCheck, adminCheck } = require('../middlewares/auth');
const {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  removeProduct,
  rateProduct,
  listRelated,
  searchFilters,
} = require('../controllers/product');

const router = express.Router();

router.get('/product', listProducts);
router.get('/product/:slug', getProduct);
router.post('/product', authCheck, adminCheck, createProduct);
router.put('/product/:slug', authCheck, adminCheck, updateProduct);
router.delete('/product/:slug', authCheck, adminCheck, removeProduct);
router.put('/product/:id/rate', authCheck, rateProduct);
router.get('/product/related/:productId', listRelated);
router.post('/search/filters', searchFilters);

module.exports = router;
