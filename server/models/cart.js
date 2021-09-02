const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;
const { MODELS } = require('../constants');

const cartSchema = new Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: MODELS.PRODUCT,
        },
        count: Number,
        color: String,
        price: Number,
      },
    ],
    cartTotal: Number,
    totalAfterDiscount: Number,
    orderedBy: { type: ObjectId, ref: MODELS.USER },
  },
  { timestamps: true }
);

module.exports = model(MODELS.CART, cartSchema);
