const { Category } = require("../models/category");
const { Product } = require("../models/product");
// const express = require("express");
// const moogoose = require("mongoose");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/category");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

const categoryController = {
  addCategory: async (req, res) => {
    try {
      const newCategory = new Category({
        name: req.body.name,
        category_id: req.body.category_id,
        imageUrl: req.file.path,
        created_at: Date.now(),
      });
      const saveCategory = await newCategory.save();
      res.status(200).json({
        message: "successfully.",
        create_category: saveCategory,
        // file: req.file,
      });
    } catch (error) {
      res.send(error);
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
      res.status(200).json({ data: category });
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

module.exports = { categoryController, upload };
// module.exports = upload;
