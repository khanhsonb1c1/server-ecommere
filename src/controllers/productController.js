const { Product } = require("../models/product");
const { Category } = require("../models/category");
const { Company } = require("../models/company");
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
        sale: req.body.sale,
        quantity: req.body.quantity,
        imageUrl: req.file.path,
        description: req.body.description,
        company: req.body.company,
      });
      const saveProduct = await newProduct.save();

      const category = Category.findById(req.body.category);
      // ? add to category
      await category.updateOne({
        $push: { product: saveProduct._id },
      });

      const company = Company.findById(req.body.company);

      await company.updateOne({
        $push: { product: saveProduct._id },
      });

      res.status(200).json({
        message: "successfully.",
        create_product: saveProduct,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllProduct: async (req, res) => {
    const PAGE_SIZE = 12;
    const page = parseInt(req.query.page);
    const category = req.query.category;
    const company = req.query.company;
    const sort = req.query.sort;
    const filter = req.query.filter;
    // ! TH1:
    if (req.query.category && req.query.company && req.query.filter) {
      try {
        const skip = (page - 1) * PAGE_SIZE;
        const product_page = await Product.find({
          $and: [
            { category: category },
            { company: company },
            { name: { $regex: filter, $options: "i" } },
          ],
        })
          .populate("category", "name")
          .populate("company", "name")
          .sort(sort)
          .skip(skip)
          .limit(PAGE_SIZE);

        const products = await Product.find({
          $and: [
            { category: category },
            { company: company },
            { name: { $regex: filter, $options: "i" } },
          ],
        });

        const total = Math.ceil(products.length / PAGE_SIZE);

        res
          .status(200)
          .json({ last_page: total, current_page: page, data: product_page });
      } catch (error) {
        res.status(500).json(error);
      }
    }

    // ! TH2
    else if (req.query.category && req.query.filter) {
      try {
        const skip = (page - 1) * PAGE_SIZE;
        const product_page = await Product.find({
          $and: [
            { category: category },
            { name: { $regex: filter, $options: "i" } },
          ],
        })
          .populate("category", "name")
          .populate("company", "name")
          .sort(sort)
          .skip(skip)
          .limit(PAGE_SIZE);

        const products = await Product.find({
          $and: [
            { category: category },
            { name: { $regex: filter, $options: "i" } },
          ],
        });

        const total = Math.ceil(products.length / PAGE_SIZE);

        res
          .status(200)
          .json({ last_page: total, current_page: page, data: product_page });
      } catch (error) {
        res.status(500).json(error);
      }
    }
    // !TH 3
    else if (req.query.company && req.query.filter) {
      try {
        const skip = (page - 1) * PAGE_SIZE;
        const product_page = await Product.find({
          $and: [
            { company: company },
            { name: { $regex: filter, $options: "i" } },
          ],
        })
          .populate("category", "name")
          .populate("company", "name")
          .sort(sort)
          .skip(skip)
          .limit(PAGE_SIZE);

        const products = await Product.find({
          $and: [
            { company: company },
            { name: { $regex: filter, $options: "i" } },
          ],
        });

        const total = Math.ceil(products.length / PAGE_SIZE);

        res
          .status(200)
          .json({ last_page: total, current_page: page, data: product_page });
      } catch (error) {
        res.status(500).json(error);
      }
    } else if (req.query.category) {
      try {
        const skip = (page - 1) * PAGE_SIZE;
        const product_page = await Product.find({
          category: category,
        })
          .populate("category", "name")
          .populate("company", "name")
          .sort(sort)
          .skip(skip)
          .limit(PAGE_SIZE);

        const products = await Product.find({
          category: category,
        });

        const total = Math.ceil(products.length / PAGE_SIZE);

        res
          .status(200)
          .json({ last_page: total, current_page: page, data: product_page });
      } catch (error) {
        res.status(500).json(error);
      }
    } else if (req.query.company) {
      try {
        const skip = (page - 1) * PAGE_SIZE;
        const product_page = await Product.find({
          company: company,
        })
          .populate("category", "name")
          .populate("company", "name")
          .sort(sort)
          .skip(skip)
          .limit(PAGE_SIZE);

        const products = await Product.find({
          company: company,
        });

        const total = Math.ceil(products.length / PAGE_SIZE);

        res
          .status(200)
          .json({ last_page: total, current_page: page, data: product_page });
      } catch (error) {
        res.status(500).json(error);
      }
    } else if (req.query.filter) {
      try {
        const skip = (page - 1) * PAGE_SIZE;
        const product_page = await Product.find({
          name: { $regex: filter, $options: "i" },
        })
          .populate("category", "name")
          .populate("company", "name")
          .sort(sort)
          .skip(skip)
          .limit(PAGE_SIZE);

        const products = await Product.find({
          name: { $regex: filter, $options: "i" },
        });

        const total = Math.ceil(products.length / PAGE_SIZE);

        res
          .status(200)
          .json({ last_page: total, current_page: page, data: product_page });
      } catch (error) {
        res.status(500).json(error);
      }
    } else
      try {
        const skip = (page - 1) * PAGE_SIZE;
        const product_page = await Product.find()
          .populate("category", "name")
          .populate("company", "name")
          .sort(sort)
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

    //   try {
    //     const products = await Product.find({})
    //       .sort({ price: 1 })
    //       .populate("category");

    //     const productss = await Product.find();
    //     const total = Math.ceil(productss.length / PAGE_SIZE);
    //     res
    //       .status(200)
    //       .json({ last_page: total, current_page: 1, data: products });
    //   } catch (error) {
    //     res.status(500).json(error);
    //   }
    // }
  },

  getDetailProduct: async (req, res) => {
    try {
      // req.params.id
      const product = await Product.findById(req.params.id).populate(
        "category"
      );
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
