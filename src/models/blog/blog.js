const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },

    title: {
        type: String,
        require: true,
    },

    imageUrl:{
        type: String,
        require: false,
    },

    description: {
        type: String,
        require: true,
    },

    content: {
        type: String,
        require: true,
    },

    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],

    created_at: {
        type: Number,
        require: true,
    },
});

let Blog = mongoose.model("Blog", BlogSchema);

module.exports = { Blog };
