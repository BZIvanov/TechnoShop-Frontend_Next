const status = require('http-status');
const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');

exports.createOrder = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();
    const { products } = await Cart.findOne({ orderedBy: user._id }).exec();

    await new Order({
      products,
      paymentIntent: req.body,
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

    res.status(status.CREATED).json({ success: true });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};
