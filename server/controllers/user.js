const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');
const Coupon = require('../models/coupon');

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  const cart = await Cart.findOne({ orderedBy: user._id })
    .populate('products.product', '_id title price totalAfterDiscount')
    .exec();

  const { products, cartTotal, totalAfterDiscount } = cart;
  res.json({ products, cartTotal, totalAfterDiscount });
};

exports.userCart = async (req, res) => {
  const { cart } = req.body;

  const user = await User.findOne({ email: req.user.email }).exec();
  const cartExistByThisUser = await Cart.findOne({
    orderedBy: user._id,
  }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
  }

  const products = await Promise.all(
    cart.map(async (cartProduct) => {
      const currentProduct = await Product.findById(cartProduct._id)
        .select('price')
        .exec();
      const price = currentProduct.price;

      return {
        product: cartProduct._id,
        count: cartProduct.count,
        color: cartProduct.color,
        price,
      };
    })
  );

  const cartTotal = products.reduce((acc, product) => {
    return acc + product.price * product.count;
  }, 0);

  await new Cart({ products, cartTotal, orderedBy: user._id }).save();

  res.json({ ok: true });
};

exports.emptyCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();

  res.json(cart);
};

exports.saveAddress = async (req, res) => {
  await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();

  res.json({ ok: true });
};

exports.applyCouponToUserCart = async (req, res) => {
  const { coupon } = req.body;

  const validCoupon = await Coupon.findOne({ name: coupon }).exec();
  if (validCoupon === null) {
    return res.json({
      err: 'Invalid coupon',
    });
  }

  const user = await User.findOne({ email: req.user.email }).exec();

  const { cartTotal } = await Cart.findOne({ orderedBy: user._id })
    .populate('products.product', '_id title price')
    .exec();

  const totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);

  Cart.findOneAndUpdate(
    { orderedBy: user._id },
    { totalAfterDiscount },
    { new: true }
  ).exec();

  res.json(totalAfterDiscount);
};
