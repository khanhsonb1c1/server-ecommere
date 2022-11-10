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
  blog: {},
  rate: {
    type: Number,
    require: false,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };
