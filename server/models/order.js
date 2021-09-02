const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;
const { MODELS, ORDER_STATUSES } = require('../constants');

const orderSchema = new Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: MODELS.PRODUCT,
        },
        count: Number,
        color: String,
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: ORDER_STATUSES.NOT_PROCESSED,
      enum: Object.values(ORDER_STATUSES),
    },
    orderedBy: { type: ObjectId, ref: MODELS.USER },
  },
  { timestamps: true }
);

module.exports = model(MODELS.ORDER, orderSchema);
