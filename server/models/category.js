const { Schema, model } = require('mongoose');
const { MODELS } = require('../constants');

const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: 'Name is required',
      minlength: [2, 'Too short'],
      maxlength: [32, 'Too long'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = model(MODELS.CATEGORY, categorySchema);
