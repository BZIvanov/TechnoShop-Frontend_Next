const express = require('express');
const { authCheck } = require('../middlewares/auth');
const { createPaymentIntent } = require('../controllers/stripe');

const router = express.Router();

router.get('/create-payment-intent', authCheck, createPaymentIntent);

module.exports = router;
