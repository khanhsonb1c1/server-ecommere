const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  product_id: {
    type: String,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: false,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  price: {
    type: Number,
    require: true,
  },
  imageUrl: {
    type: String,
    require: false,
  },

  company:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },

  quantity: {
    type: String,
    require: true,
  },
  discount: {
    type: Number,
    require: false,
  },
  description: {
    type: String,
    require: true,
  },
  created_at: {
    type: String,
    default: Date.now(),
  },
  blog: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  }],
  rate: {
    type: Number,
    require: false,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };
