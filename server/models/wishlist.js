const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;
const { MODELS } = require('../constants');

const wishlistSchema = new Schema(
  {
    products: [{ type: ObjectId, ref: MODELS.PRODUCT }],
    owner: { type: ObjectId, ref: MODELS.USER },
  },
  { timestamps: true }
);

module.exports = model(MODELS.WISHLIST, wishlistSchema);
