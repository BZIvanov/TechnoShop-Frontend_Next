const status = require('http-status');
const User = require('../models/user');
const Wishlist = require('../models/wishlist');

exports.getUserWishlist = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();

    const wishlist = await Wishlist.find({ owner: user._id })
      .populate('products')
      .exec();

    const products = wishlist[0] ? wishlist[0].products : [];

    res.status(status.OK).json(products);
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};

exports.updateUserWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findOne({ email: req.user.email }).exec();
    let wishlist = await Wishlist.findOne({ owner: user._id }).exec();

    if (!wishlist) {
      wishlist = await new Wishlist({ owner: user._id }).save();
    }

    const isExistingProduct = wishlist.products.includes(productId);

    const updateConfig = {
      ...(isExistingProduct && { $pull: { products: productId } }),
      ...(!isExistingProduct && { $addToSet: { products: productId } }),
    };

    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { owner: user._id },
      updateConfig,
      { new: true }
    )
      .populate('products')
      .exec();

    res.status(status.OK).json(updatedWishlist.products);
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};
