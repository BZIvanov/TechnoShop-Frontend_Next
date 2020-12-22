const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  const cart = await Cart.findOne({ orderedBy: user._id })
    .populate('products.product', '_id title price totalAfterDiscount')
    .exec();

  const { products, cartTotal, totalAfterDiscount } = cart;
  res.json({ products, cartTotal, totalAfterDiscount });
};

exports.userCart = async (req, res) => {
  const { cart } = req.body;

  const user = await User.findOne({ email: req.user.email }).exec();
  const cartExistByThisUser = await Cart.findOne({
    orderedBy: user._id,
  }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
  }

  const products = await Promise.all(
    cart.map(async (cartProduct) => {
      const { price } = await Product.findById(cartProduct._id)
        .select('price')
        .exec();

      return {
        product: cartProduct._id,
        count: cartProduct.count,
        color: cartProduct.color,
        price,
      };
    })
  );

  const cartTotal = products.reduce((acc, product) => {
    return acc + product.price * product.count;
  }, 0);

  await new Cart({ products, cartTotal, orderedBy: user._id }).save();

  res.json({ ok: true });
};

exports.emptyCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();

  res.json(cart);
};
