const status = require('http-status');
const slugify = require('slugify');
const Product = require('../models/product');
const User = require('../models/user');

exports.listProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .limit(parseInt(req.query.count))
      .populate('category')
      .populate('subcategories')
      .sort([['createdAt', 'desc']])
      .exec();

    res.status(status.OK).json(products);
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ error });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = { ...req.body };
    product.slug = slugify(product.title);
    product.subcategories = req.body.selectedSubcategories;

    const newProduct = await new Product(product).save();

    res.status(status.CREATED).json(newProduct);
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};

exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate('category')
    .populate('subcategories')
    .exec();

  res.json(product);
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    ).exec();

    res.json(updated);
  } catch (err) {
    console.log('PRODUCT UPDATE ERROR ----> ', err);
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();

    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).send('Product delete failed');
  }
};

exports.list = async (req, res) => {
  try {
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3;

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate('category')
      .populate('subcategories')
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

exports.productsCount = async (req, res) => {
  const total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  const existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  if (existingRatingObject === undefined) {
    const ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();

    res.json(ratingAdded);
  } else {
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRatingObject },
      },
      { $set: { 'ratings.$.star': star } },
      { new: true }
    ).exec();

    res.json(ratingUpdated);
  }
};

exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(3)
    .populate('category')
    .populate('subcategories')
    .populate('postedBy')
    .exec();

  res.json(related);
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
