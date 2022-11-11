const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
   blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
   },

   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
   },

   content: {
    type: String,
    require: true,
   },

   rep_comment: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RepComment",
    },
],

   created_at: {
    type: Number,
    default: Date.now(),
   },

   
});

let Comment = mongoose.model("Comment", CommentSchema);

module.exports = { Comment };
