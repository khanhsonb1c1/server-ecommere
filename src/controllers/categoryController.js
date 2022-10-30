const { Category } = require("../models/category");
const { Product } = require("../models/product");

const categoryController = {
  addCategory: async (req, res) => {
    try {
      const newCategory = new Category(req.body);
      const saveCategory = await newCategory.save();
      res.status(200).json(saveCategory);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllCategory: async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getDetailcategory: async (req, res) => {
    try {
      const category = await Category.find({
        category_id: req.params.id,
      }).populate("product");
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateCategory: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      await category.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteCategory: async (req, res) => {
    try {
      await Product.updateMany({ category: req.params.id }, { category: null });
      await Category.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = categoryController;
