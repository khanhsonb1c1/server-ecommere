const { Blog } = require("../../models/blog/blog");
const { Product } = require("../../models/product");
const { Comment } = require("../../models/blog/comment");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images/blog");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
});

const blogController = {
  addBlog: async (req, res) => {
    try {
      const newBlog = new Blog({
        product: req.body.product,
        title: req.body.title,
        title1: req.body.title,
        title2: req.body.title2,
        description: req.body.description,
        content1: req.body.content1,
        content2: req.body.content2,
        imageUrl: req.file.path,
      });

      const saveBlog = await newBlog.save();

      if (req.body.product) {
        const product = Product.findById(req.body.product);

        await product.updateOne({
          $push: { blog: saveBlog._id },
        });
      }

      res.status(200).json({
        message: "successfully.",
        data: saveBlog,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllBlog: async (req, res) => {
    const PAGE_SIZE = 4;

    const page = req.query.page;

    try {
      const skip = (page - 1) * PAGE_SIZE;

      const blog = await Blog.find()
        .skip(skip)
        .limit(PAGE_SIZE)
        .sort("created_at");

      const blogs = await Blog.find();

      const total = Math.ceil(blogs.length / PAGE_SIZE);

      res.status(200).json({
        last_page: total,
        current_page: page,
        data: blog,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getBlogDetail: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id)
        .populate({
          path: "comment",

          populate: {
            path: "rep_comment",
            populate: {
              path: "user",
            },
          },
        })
        .populate({
          path: "comment",
          populate: { path: "user" },
        });

      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateBlog: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      await blog.updateOne({ $set: req.body });
      res.status(200).json({
        message: "Updated successfully !",
        data: blog,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteBlog: async (req, res) => {
    try {
      await Product.updateMany(
        { blog: req.params.id },
        { $pull: { blog: req.params.id } }
      );

      //! search and delete item have blog = _id Blog in Comment model
      await Comment.findByIdAndDelete({ blog: req.params.id });

      await Blog.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = { blogController, upload };
