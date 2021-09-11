const express = require('express');
const { authCheck, adminCheck } = require('../middlewares/auth');
const {
  listCoupons,
  createCoupon,
  removeCoupon,
} = require('../controllers/coupon');

const router = express.Router();

router.get('/coupon', listCoupons);
router.post('/coupon', authCheck, adminCheck, createCoupon);
router.delete('/coupon/:id', authCheck, adminCheck, removeCoupon);

module.exports = router;
