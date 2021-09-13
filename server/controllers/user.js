const status = require('http-status');
const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');
const Coupon = require('../models/coupon');

exports.updateUser = async (req, res) => {
  try {
    const { address } = req.body;

    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { address },
      { new: true }
    )
      .select('_id name email address')
      .exec();

    res.status(status.OK).json(user);
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();
    const cart = await Cart.findOne({ orderedBy: user._id })
      .populate('products.product')
      .exec();

    res.status(status.OK).json(cart);
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};

exports.saveUserCart = async (req, res) => {
  try {
    const { cart } = req.body;

    const user = await User.findOne({ email: req.user.email }).exec();
    const existingCart = await Cart.findOne({
      orderedBy: user._id,
    }).exec();

    if (existingCart) {
      await existingCart.remove();
    }

    const products = await Promise.all(
      cart.map(async (cartProduct) => {
        // make sure the price was not manipulated for each product from the cart
        const currentProduct = await Product.findById(cartProduct._id).exec();

        return {
          product: cartProduct._id,
          count: cartProduct.count,
          color: cartProduct.color,
          price: currentProduct.price,
        };
      })
    );

    const cartTotal = products.reduce((acc, product) => {
      return acc + product.price * product.count;
    }, 0);

    await new Cart({ products, cartTotal, orderedBy: user._id }).save();

    res.status(status.CREATED).json({ success: true });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};

exports.emptyUserCart = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();
    await Cart.findOneAndRemove({ orderedBy: user._id }).exec();

    res.status(status.OK).json({ success: true });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};

exports.applyCouponToUserCart = async (req, res) => {
  try {
    const { coupon } = req.body;

    const validCoupon = await Coupon.findOne({ name: coupon }).exec();
    if (!validCoupon) {
      return res.status(status.NOT_FOUND).json({ message: 'Invalid coupon' });
    }

    const user = await User.findOne({ email: req.user.email }).exec();

    const { cartTotal } = await Cart.findOne({ orderedBy: user._id })
      .populate('products.product', '_id title price')
      .exec();

    const totalAfterDiscount =
      cartTotal - (cartTotal * validCoupon.discount) / 100;

    const userCart = await Cart.findOneAndUpdate(
      { orderedBy: user._id },
      { totalAfterDiscount },
      { new: true }
    ).exec();

    res.status(status.OK).json(userCart.totalAfterDiscount);
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};
