const status = require('http-status');
const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');
const { USER_ROLES } = require('../constants');

exports.listOrders = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();

    const nonAdminFilters = {
      ...(user.role !== USER_ROLES.ADMIN && { orderedBy: user._id }),
    };

    const orders = await Order.find(nonAdminFilters)
      .sort('-createdAt')
      .populate('products.product')
      .exec();

    res.status(status.OK).json(orders);
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};

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

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { orderStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true }
    )
      .populate('products.product')
      .exec();

    res.status(status.OK).json(order);
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};
