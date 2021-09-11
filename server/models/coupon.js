const { Schema, model } = require('mongoose');
const { MODELS } = require('../constants');

const couponSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      uppercase: true,
      required: 'Coupon name is required',
      minlength: [6, 'Coupon name is too short'],
      maxlength: [12, 'Coupon name is too long'],
    },
    expiry: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      requred: true,
    },
  },
  { timestamps: true }
);

module.exports = model(MODELS.COUPON, couponSchema);
