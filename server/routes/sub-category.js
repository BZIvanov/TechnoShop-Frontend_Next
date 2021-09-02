const express = require('express');
const { authCheck, adminCheck } = require('../middlewares/auth');
const {
  create,
  read,
  update,
  remove,
  list,
} = require('../controllers/sub-category');

const router = express.Router();

router.post('/subcategory', authCheck, adminCheck, create);
router.get('/subcategory', list);
router.get('/subcategory/:slug', read);
router.put('/subcategory/:slug', authCheck, adminCheck, update);
router.delete('/subcategory/:slug', authCheck, adminCheck, remove);

module.exports = router;
