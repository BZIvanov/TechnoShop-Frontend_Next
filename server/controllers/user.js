const User = require('../models/user');
const Product = require('../models/product');
const Cart = require('../models/cart');

exports.userCart = async (req, res) => {
  const { cart } = req.body;

  const user = await User.findOne({ email: req.user.email }).exec();
  const cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();

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
