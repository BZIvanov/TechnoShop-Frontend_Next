const status = require('http-status');
const slugify = require('slugify');
const Category = require('../models/category');
const Product = require('../models/product');
const SubCategory = require('../models/sub-category');

exports.listCategories = async (_, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 }).exec();

    res.status(status.OK).json(categories);
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ error });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await new Category({ name, slug: slugify(name) }).save();

    res.status(status.CREATED).json(category);
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug }).exec();
    const products = await Product.find({ category })
      .populate('category')
      .exec();

    const categoryWithProducts = { ...category.toObject(), products };

    res.status(status.OK).json(categoryWithProducts);
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};

exports.updateCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(status.OK).json(category);
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};

exports.removeCategory = async (req, res) => {
  try {
    await Category.findOneAndDelete({ slug: req.params.slug });

    res.status(status.OK).json({ success: true });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};

exports.getCategorySubcategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.find({
      parent: req.params.id,
    }).exec();

    res.status(status.OK).json(subcategories);
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};
