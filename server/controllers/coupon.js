const status = require('http-status');
const Coupon = require('../models/coupon');

exports.listCoupons = async (_, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 }).exec();

    res.status(status.OK).json(coupons);
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};

exports.createCoupon = async (req, res) => {
  try {
    const { name, expiry, discount } = req.body;

    const coupon = await new Coupon({ name, expiry, discount }).save();

    res.status(status.CREATED).json(coupon);
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};

exports.removeCoupon = async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id).exec();

    res.status(status.OK).json({ success: true });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};
