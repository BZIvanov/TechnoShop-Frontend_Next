const express = require('express');
const { authCheck, adminCheck } = require('../middlewares/auth');
const {
  create,
  listAll,
  read,
  update,
  remove,
  list,
  productsCount,
  productStar,
  listRelated,
  searchFilters,
} = require('../controllers/product');

const router = express.Router();

router.post('/product', authCheck, adminCheck, create);
router.get('/product/total', productsCount);
// TODO fix products -> product
router.get('/products/:count', listAll);
router.get('/product/:slug', read);
router.put('/product/:slug', authCheck, adminCheck, update);
router.delete('/product/:slug', authCheck, adminCheck, remove);
// TODO fix products -> product
router.post('/products', list);
router.put('/product/star/:productId', authCheck, productStar);
router.get('/product/related/:productId', listRelated);
router.post('/search/filters', searchFilters);

module.exports = router;
