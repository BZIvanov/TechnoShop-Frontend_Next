const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;
const { MODELS } = require('../constants');

const subCategorySchema = new Schema(
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
    parent: { type: ObjectId, ref: MODELS.CATEGORY, required: true },
  },
  { timestamps: true }
);

module.exports = model(MODELS.SUB_CATEGORY, subCategorySchema);
