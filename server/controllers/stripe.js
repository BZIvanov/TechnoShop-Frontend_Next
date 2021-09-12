const User = require('../models/user');
const Cart = require('../models/cart');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  const { cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderedBy: user._id,
  }).exec();

  let finalAmount = 0;

  if (totalAfterDiscount && totalAfterDiscount > 0) {
    finalAmount = totalAfterDiscount * 100;
  } else {
    finalAmount = cartTotal * 100;
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount,
    currency: 'usd',
  });

  res.send(paymentIntent.client_secret);
};
