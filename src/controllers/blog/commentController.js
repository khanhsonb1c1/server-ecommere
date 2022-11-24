const { Blog } = require("../../models/blog/blog");
const { Comment } = require("../../models/blog/comment");

const commentController = {
  addComment: async (req, res) => {
    try {
      const newComment = new Comment({
        blog: req.body.blog,
        content: req.body.content,
        user: req.body.user,
      });

      const saveComment = await newComment.save();

      if (req.body.blog) {
        const blog = Blog.findById(req.body.blog);

        await blog.updateOne({
          $push: { comment: saveComment._id },
        });
      }

      res.status(200).json({
        message: "successfully.",
        data: saveComment,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAllComment: async (req, res) => {
    const PAGE_SIZE = 10;
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
      const blog = await Blog.findById(req.params.id).populate("comment");

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

module.exports = commentController;
