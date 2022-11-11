const mongoose = require("mongoose");

const RepCommentSchema = new mongoose.Schema({
   comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
   },

   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
   },

   content: {
    type: String,
    require: true,
   },

   created_at: {
    type: Number,
    default: Date.now(),
   },

   
});

let RepComment = mongoose.model("RepComment", RepCommentSchema);

module.exports = { RepComment };
