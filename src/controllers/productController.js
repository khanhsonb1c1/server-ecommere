const { Product } = require("../models/product");
const { Category } = require("../models/category");

const productController = {
  addProduct: async (req, res) => {
    try {
      const newProduct = new Product({
        product_id: req.body.product_id,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity,
        image: {
          data: req.file.filename,
          contentType: "image/jpg",
        },
      });
      const saveProduct = await newProduct.save();
      if (req.body.category) {
        const category = Category.findById(req.body.category);
        // ? add to category
        await category.updateOne({
          $push: { product: saveProduct._id },
        });
      }

      res.status(200).json(saveProduct);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllProduct: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getDetailProduct: async (req, res) => {
    try {
      // req.params.id
      const product = await Product.find({
        product_id: req.params.id,
      }).populate("category");
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateProduct: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      await product.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      // ! Tìm và lấy ra product trong category
      await Category.updateMany(
        { product: req.params.id },
        { $pull: { product: req.params.id } }
      );
      await Product.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = productController;
