const express = require('express');
const { authCheck, adminCheck } = require('../middlewares/auth');
const {
  create,
  listAll,
  read,
  update,
  remove,
  list,
} = require('../controllers/product');

const router = express.Router();

router.post('/product', authCheck, adminCheck, create);
router.get('/products/:count', listAll);
router.get('/product/:slug', read);
router.put('/product/:slug', authCheck, adminCheck, update);
router.delete('/product/:slug', authCheck, adminCheck, remove);
router.post('/products', list);

module.exports = router;
