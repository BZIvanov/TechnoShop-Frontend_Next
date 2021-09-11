const status = require('http-status');
const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');
const Coupon = require('../models/coupon');
const Order = require('../models/order');
const uniqueid = require('uniqueid');

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

    res.json(user);
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

exports.createOrder = async (req, res) => {
  const { paymentIntent } = req.body.stripeResponse;

  const user = await User.findOne({ email: req.user.email }).exec();
  const { products } = await Cart.findOne({ orderedBy: user._id }).exec();

  await new Order({
    products,
    paymentIntent,
    orderedBy: user._id,
  }).save();

  const bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  await Product.bulkWrite(bulkOption, {});

  res.json({ ok: true });
};

exports.createCashOrder = async (req, res) => {
  const { COD, couponApplied } = req.body;

  if (!COD) return res.status(400).send('Create cash order failed');

  const user = await User.findOne({ email: req.user.email }).exec();
  const userCart = await Cart.findOne({ orderedBy: user._id }).exec();

  let finalAmount = 0;

  if (couponApplied && userCart.totalAfterDiscount) {
    finalAmount = userCart.totalAfterDiscount * 100;
  } else {
    finalAmount = userCart.cartTotal * 100;
  }

  await new Order({
    products: userCart.products,
    paymentIntent: {
      id: uniqueid(),
      amount: finalAmount,
      currency: 'usd',
      status: 'Cash On Delivery',
      created: Date.now(),
      payment_method_types: ['cash'],
    },
    orderedBy: user._id,
    orderStatus: 'Cash On Delivery',
  }).save();

  const bulkOption = userCart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  await Product.bulkWrite(bulkOption, {});

  res.json({ ok: true });
};

exports.orders = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const userOrders = await Order.find({ orderedBy: user._id })
    .populate('products.product')
    .exec();

  res.json(userOrders);
};

exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;

  await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};

exports.wishlist = async (req, res) => {
  const list = await User.findOne({ email: req.user.email })
    .select('wishlist')
    .populate('wishlist')
    .exec();

  res.json(list);
};

exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;

  await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};
