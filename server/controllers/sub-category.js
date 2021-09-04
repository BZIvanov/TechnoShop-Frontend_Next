const status = require('http-status');
const slugify = require('slugify');
const SubCategory = require('../models/sub-category');
const Product = require('../models/product');

exports.listSubcategories = async (_, res) => {
  try {
    const subcategory = await SubCategory.find().sort({ createdAt: -1 }).exec();

    res.status(status.OK).json(subcategory);
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ error });
  }
};

exports.createSubcategory = async (req, res) => {
  try {
    const { name, parent } = req.body;

    const subcategory = await new SubCategory({
      name,
      parent,
      slug: slugify(name),
    }).save();

    res.status(status.CREATED).json(subcategory);
  } catch (err) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};

exports.getSubcategory = async (req, res) => {
  try {
    const subcategory = await SubCategory.findOne({
      slug: req.params.slug,
    }).exec();
    const products = await Product.find({ subcategories: subcategory })
      .populate('category')
      .exec();

    const subcategoryWithProducts = { ...subcategory.toObject(), products };

    res.status(status.OK).json(subcategoryWithProducts);
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};

exports.updateSubcategory = async (req, res) => {
  try {
    const { name, parent } = req.body;

    const subcategory = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );

    res.status(status.OK).json(subcategory);
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};

exports.removeSubcategory = async (req, res) => {
  try {
    await SubCategory.findOneAndDelete({
      slug: req.params.slug,
    });

    res.status(status.OK).json({ success: true });
  } catch (error) {
    res.status(status.BAD_REQUEST).json({ error });
  }
};
