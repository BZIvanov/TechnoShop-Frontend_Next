const express = require('express');
const { authCheck, adminCheck } = require('../middlewares/auth');
const {
  listCategories,
  createCategory,
  getCategory,
  updateCategory,
  removeCategory,
  getCategorySubcategories,
} = require('../controllers/category');

const router = express.Router();

router.get('/category', listCategories);
router.post('/category', authCheck, adminCheck, createCategory);
router.get('/category/:slug', getCategory);
router.put('/category/:slug', authCheck, adminCheck, updateCategory);
router.delete('/category/:slug', authCheck, adminCheck, removeCategory);
router.get('/category/:id/subcategory', getCategorySubcategories);

module.exports = router;
