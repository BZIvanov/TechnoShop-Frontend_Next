const status = require('http-status');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');
const Order = require('../models/order');
const { USER_ROLES, PAYMENT_TYPES, ORDER_STATUSES } = require('../constants');

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
    let { paymentType, paymentInfo } = req.body;

    const user = await User.findOne({ email: req.user.email }).exec();
    const cart = await Cart.findOne({ orderedBy: user._id }).exec();

    // if cash payment create custom paymentIntent object similar to stripe's
    if (paymentType === PAYMENT_TYPES.CASH) {
      paymentInfo = {
        id: uuidv4(),
        amount:
          cart.totalAfterDiscount > 0
            ? cart.totalAfterDiscount * 100
            : cart.cartTotal * 100,
        currency: 'usd',
        status: ORDER_STATUSES.CASH_ON_DELIVERY,
        created: Date.now() / 1000,
        payment_method_types: [PAYMENT_TYPES.CASH],
      };
    }

    await new Order({
      products: cart.products,
      paymentIntent: paymentInfo,
      orderedBy: user._id,
      orderStatus:
        paymentType === PAYMENT_TYPES.CASH
          ? ORDER_STATUSES.CASH_ON_DELIVERY
          : ORDER_STATUSES.NOT_PROCESSED,
    }).save();

    // update quantity and sold values for each product in the cart so the other users can see correct values
    const bulkOption = cart.products.map((item) => {
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
