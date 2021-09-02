const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;
const { MODELS, YES_NO, COLORS, BRANDS } = require('../constants');

const productSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: MODELS.CATEGORY,
    },
    subcategories: [
      {
        type: ObjectId,
        ref: MODELS.SUB_CATEGORY,
      },
    ],
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: { type: Array },
    shipping: {
      type: String,
      default: YES_NO.NO,
      enum: Object.values(YES_NO),
    },
    color: {
      type: String,
      enum: COLORS,
    },
    brand: {
      type: String,
      enum: BRANDS,
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: MODELS.USER },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model(MODELS.PRODUCT, productSchema);
