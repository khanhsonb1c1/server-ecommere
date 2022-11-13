const { Product } = require("../models/product");
const { Category } = require("../models/category");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/product");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

const productController = {
  addProduct: async (req, res) => {
    try {
      const newProduct = new Product({
        product_id: req.body.product_id,
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity,
        imageUrl: req.file.path,
        description: req.body.description,
        created_at: Date.now(),
      });
      const saveProduct = await newProduct.save();
      if (req.body.category) {
        const category = Category.findById(req.body.category);
        // ? add to category
        await category.updateOne({
          $push: { product: saveProduct._id },
        });
      }

      res.status(200).json({
        message: "successfully.",
        create_product: saveProduct,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllProduct: async (req, res) => {
    const PAGE_SIZE = 4;
    const page = req.query.page;

    if (page) {
      try {
        const skip = (page - 1) * PAGE_SIZE;
        const product_page = await Product.find()
          .populate("category")
          .skip(skip)
          .limit(PAGE_SIZE);

        const products = await Product.find();

        const total = Math.ceil(products.length / PAGE_SIZE);

        res
          .status(200)
          .json({ last_page: total, current_page: page, data: product_page });
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      try {
        const products = await Product.find({})
          .sort({ price: 1 })
          .populate("category");

        const productss = await Product.find();
        const total = Math.ceil(productss.length / PAGE_SIZE);
        res
          .status(200)
          .json({ last_page: total, current_page: 1, data: products });
      } catch (error) {
        res.status(500).json(error);
      }
    }
  },

  getDetailProduct: async (req, res) => {
    try {
      // req.params.id
      const product = await Product.find({
        product_id: req.params.id,
      }).populate("category");
      res.status(200).json({ data: product });
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

module.exports = { productController, upload };
