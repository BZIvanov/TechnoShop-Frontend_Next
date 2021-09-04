const express = require('express');
const { authCheck, adminCheck } = require('../middlewares/auth');
const {
  listSubcategories,
  createSubcategory,
  getSubcategory,
  updateSubcategory,
  removeSubcategory,
} = require('../controllers/sub-category');

const router = express.Router();

router.get('/subcategory', listSubcategories);
router.post('/subcategory', authCheck, adminCheck, createSubcategory);
router.get('/subcategory/:slug', getSubcategory);
router.put('/subcategory/:slug', authCheck, adminCheck, updateSubcategory);
router.delete('/subcategory/:slug', authCheck, adminCheck, removeSubcategory);

module.exports = router;
