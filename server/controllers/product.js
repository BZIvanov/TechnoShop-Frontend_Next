const status = require('http-status');
const slugify = require('slugify');
const Product = require('../models/product');
const User = require('../models/user');

exports.listProducts = async (req, res) => {
  try {
    const {
      sortColumn = 'createdAt',
      order = 'desc',
      page,
      perPage,
    } = req.query;

    const pageNumber = parseInt(page || 1, 10);
    const perPageNumber = parseInt(perPage || 10, 10);

    const products = await Product.find()
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

const handleQuery = async (req, res, query) => {
  try {
    const products = await Product.find({ $text: { $search: query } })
      .populate('category', '_id name')
      .populate('subcategories', '_id name')
      .populate('postedBy', '_id name')
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const handlePrice = async (req, res, price) => {
  try {
    const products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate('category', '_id name')
      .populate('subcategories', '_id name')
      .populate('postedBy', '_id name')
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const handleCategory = async (req, res, category) => {
  try {
    const products = await Product.find({ category })
      .populate('category', '_id name')
      .populate('subcategories', '_id name')
      .populate('postedBy', '_id name')
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

const handleStar = (req, res, stars) => {
  Product.aggregate([
    {
      $project: {
        document: '$$ROOT',
        floorAverage: {
          $floor: { $avg: '$ratings.star' },
        },
      },
    },
    { $match: { floorAverage: stars } },
  ])
    .limit(12)
    .exec((err, aggregates) => {
      if (err) console.log('AGGREGATE ERROR', err);

      Product.find({ _id: aggregates })
        .populate('category', '_id name')
        .populate('subcategories', '_id name')
        .populate('postedBy', '_id name')
        .exec((err, products) => {
          if (err) console.log('PRODUCT AGGREGATE ERROR', err);

          res.json(products);
        });
    });
};

const handleSubCategory = async (req, res, sub) => {
  const products = await Product.find({ subcategories: sub })
    .populate('category', '_id name')
    .populate('subcategories', '_id name')
    .populate('postedBy', '_id name')
    .exec();

  res.json(products);
};

const handleShipping = async (req, res, shipping) => {
  const products = await Product.find({ shipping })
    .populate('category', '_id name')
    .populate('subcategories', '_id name')
    .populate('postedBy', '_id name')
    .exec();

  res.json(products);
};

const handleColor = async (req, res, color) => {
  const products = await Product.find({ color })
    .populate('category', '_id name')
    .populate('subcategories', '_id name')
    .populate('postedBy', '_id name')
    .exec();

  res.json(products);
};

const handleBrand = async (req, res, brand) => {
  const products = await Product.find({ brand })
    .populate('category', '_id name')
    .populate('subcategories', '_id name')
    .populate('postedBy', '_id name')
    .exec();

  res.json(products);
};

exports.searchFilters = async (req, res) => {
  const { query, price, category, stars, sub, shipping, color, brand } =
    req.body;

  if (query) {
    await handleQuery(req, res, query);
  }

  if (price !== undefined) {
    await handlePrice(req, res, price);
  }

  if (category) {
    await handleCategory(req, res, category);
  }

  if (stars) {
    handleStar(req, res, stars);
  }

  if (sub) {
    await handleSubCategory(req, res, sub);
  }

  if (shipping) {
    await handleShipping(req, res, shipping);
  }

  if (color) {
    await handleColor(req, res, color);
  }

  if (brand) {
    await handleBrand(req, res, brand);
  }
};
