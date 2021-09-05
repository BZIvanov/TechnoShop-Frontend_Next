const express = require('express');
const { authCheck, adminCheck } = require('../middlewares/auth');
const {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  removeProduct,
  list,
  productsCount,
  productStar,
  listRelated,
  searchFilters,
} = require('../controllers/product');

const router = express.Router();

router.get('/product', listProducts); // ok
router.get('/product/:slug', getProduct); // ok
router.post('/product', authCheck, adminCheck, createProduct); // ok
router.put('/product/:slug', authCheck, adminCheck, updateProduct); // ok
router.delete('/product/:slug', authCheck, adminCheck, removeProduct); // ok
router.get('/product/total', productsCount);
// TODO fix products -> product
router.post('/products', list);
router.put('/product/star/:productId', authCheck, productStar);
router.get('/product/related/:productId', listRelated);
router.post('/search/filters', searchFilters);

module.exports = router;
