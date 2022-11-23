const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  title1: {
    type: String,
    require: true,
  },
  
  title2: {
    type: String,
    require: false,
  },
  
  title3: {
    type: String,
    require: false,
  },

  imageUrl: {
    type: String,
    require: false,
  },

  description: {
    type: String,
    require: true,
  },

  content1: {
    type: String,
    require: true,
  },
  
  content2: {
    type: String,
    require: false,
  },
  
  content3: {
    type: String,
    require: false,
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
    default: Math.round(+new Date() / 1000),
  },
});

let Blog = mongoose.model("Blog", BlogSchema);

module.exports = { Blog };
