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

      const comment = await Comment.find()
        .skip(skip)
        .limit(PAGE_SIZE)
        .sort("created_at")

        .populate("rep_comment");

      const comments = await Comment.find();
      const total = Math.ceil(comments.length / PAGE_SIZE);
      res.status(200).json({
        last_page: total,
        current_page: page,
        data: comment,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getDetailComment: async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id).populate(
        "rep_comment"
      );
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateComment: async (req, res) => {
    try {
      const cmt = await Comment.findById(req.params.id);
      await cmt.updateOne({ $set: req.body });
      res.status(200).json({
        message: "Updated successfully !",
        data: cmt,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteComment: async (req, res) => {
    try {
      await Blog.updateMany(
        { comment: req.params.id },
        { $pull: { comment: req.params.id } }
      );

      await Comment.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = commentController;
