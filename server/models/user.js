const { Schema, model } = require('mongoose');
const { ObjectId } = Schema;
const { MODELS, USER_ROLES } = require('../constants');

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    role: {
      type: String,
      enum: Object.values(USER_ROLES),
      default: USER_ROLES.USER,
    },
    cart: { type: Array, default: [] },
    address: String,
    wishlist: [{ type: ObjectId, ref: MODELS.PRODUCT }],
  },
  { timestamps: true }
);

module.exports = model(MODELS.USER, userSchema);
