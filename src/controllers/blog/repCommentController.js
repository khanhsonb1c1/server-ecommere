const { Comment } = require("../../models/blog/comment");

const repCommentController = {
    newRepComment: async (req, res) => {
        try {
            const newRepComment = new Comment({
                content: req.body.content,
                user: req.body.user,
                comment: req.body.comment,
            });

            const saveRepComment = await newRepComment.save();

            if (req.body.comment) {
                const cmt = Comment.findById(req.body.comment);

                await cmt.updateOne({
                    $push: { rep_comment: saveRepComment._id },
                });
            }

            res.status(200).json({
                message: "successfully.",
                data: saveRepComment,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAllRepComment: async (req, res) => {
        const PAGE_SIZE = 10;
        const page = req.query.page;
        const filter_cmt = req.query.filter_cmt;

        try {
            const skip = (page - 1) * PAGE_SIZE;

            const cmt = await Comment.find()
                .skip(skip)
                .limit(PAGE_SIZE)
                .sort("created_at");

            const cmts = await Comment.find();

            const total = Math.ceil(cmts.length / PAGE_SIZE);

            res.status(200).json({
                last_page: total,
                current_page: page,
                data: cmt,
            });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateRepComment: async (req, res) => {
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

    deleteRepComment: async (req, res) => {
        try {
            await Comment.updateMany(
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
