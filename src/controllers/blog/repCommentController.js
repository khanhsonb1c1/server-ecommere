const { Comment } = require("../../models/blog/comment");
const { RepComment } = require("../../models/blog/repComment");

const repCommentController = {
  newRepComment: async (req, res) => {
    try {
      const rep_cmt = new RepComment({
        user: req.body.user,
        comment: req.body.comment,
        content: req.body.content,
      });

      const saveRepComment = await rep_cmt.save();

      const cmt = Comment.findById(req.body.comment);

      await cmt.updateOne({
        $push: { rep_comment: saveRepComment._id },
      });

      res.status(200).json(saveRepComment);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateRepComment: async (req, res) => {
    try {
      const rep_cmt = await Comment.findById(req.params.id);
      await rep_cmt.updateOne({ $set: req.body });
      res.status(200).json({
        message: "Updated successfully !",
        data: rep_cmt,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteRepComment: async (req, res) => {
    try {
      await RepComment.updateMany(
        { rep_comment: req.params.id },
        { $pull: { rep_comment: req.params.id } }
      );

      await repComment.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = repCommentController;
