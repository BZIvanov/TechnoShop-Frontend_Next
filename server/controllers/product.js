const status = require('http-status');
const slugify = require('slugify');
const Product = require('../models/product');
const User = require('../models/user');

const handleStars = (stars) => {
  return Product.aggregate([
    {
      $project: {
        document: '$$ROOT',
        cailAverage: {
          $ceil: { $avg: '$ratings.star' },
        },
      },
    },
    { $match: { cailAverage: parseInt(stars, 10) } },
  ]);
};

const handleQueryParams = async (params) => {
  const {
    text,
    price,
    categories,
    stars,
    subcategory,
    brands,
    colors,
    shipping,
  } = params;

  const aggregates = stars && (await handleStars(stars));

  const build = {
    ...(text && { $text: { $search: text } }),
    ...(price && {
      price: {
        $gte: parseInt(price.split(',')[0], 10),
        $lte: parseInt(price.split(',')[1], 10),
      },
    }),
    ...(categories && {
      category: categories.split(','),
    }),
    ...(stars && { _id: aggregates }),
    ...(subcategory && { subcategories: subcategory }),
    ...(brands && { brand: brands.split(',') }),
    ...(colors && { color: colors.split(',') }),
    ...(shipping && { shipping }),
  };

  return build;
};

exports.listProducts = async (req, res) => {
  try {
    const {
      sortColumn = 'createdAt',
      order = 'desc',
      page,
      perPage,
      ...rest
    } = req.query;

    const builder = await handleQueryParams(rest);

    const pageNumber = parseInt(page || 1, 10);
    const perPageNumber = parseInt(perPage || 12, 10);

    const products = await Product.find(builder)
      .skip((pageNumber - 1) * perPageNumber)
      .limit(perPageNumber)
      .populate('category')
      .populate('subcategories')
      .sort([[sortColumn, order]])
      .exec();

    const totalCount = await Product.find().estimatedDocumentCount().exec();

    res.status(status.OK).json({ totalCount, products });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ error });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('category')
      .populate('subcategories')
      .exec();

    res.status(status.OK).json(product);
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = { ...req.body };
    product.slug = slugify(product.title);

    const newProduct = await new Product(product).save();

    res.status(status.CREATED).json(newProduct);
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = { ...req.body };
    product.slug = slugify(product.title);

    const updatedProduct = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      product,
      { new: true }
    ).exec();

    res.status(status.OK).json(updatedProduct);
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};

exports.removeProduct = async (req, res) => {
  try {
    await Product.findOneAndRemove({ slug: req.params.slug }).exec();

    res.status(status.OK).json({ success: true });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};

exports.rateProduct = async (req, res) => {
  const { rating: userRating } = req.body;

  const product = await Product.findById(req.params.id).exec();
  const user = await User.findOne({ email: req.user.email }).exec();

  const existingRatingObject = product.ratings.find(
    (rating) => rating.postedBy.toString() === user._id.toString()
  );

  if (existingRatingObject) {
    await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { 'ratings.$.star': userRating } },
      { new: true }
    ).exec();
  } else {
    await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star: userRating, postedBy: user._id } },
      },
      { new: true }
    ).exec();
  }

  const updatedProduct = await Product.findById(req.params.id)
    .populate('category')
    .populate('subcategories')
    .exec();

  res.status(status.OK).json(updatedProduct);
};

exports.listSimilarProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).exec();

    const numberOfProducts = 3;
    const similarProducts = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
    })
      .limit(numberOfProducts)
      .populate('category')
      .populate('subcategories')
      .populate('postedBy')
      .exec();

    res
      .status(status.OK)
      .json({ totalCount: numberOfProducts, products: similarProducts });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ error });
  }
};
