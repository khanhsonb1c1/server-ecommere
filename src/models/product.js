const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  product_id: {
    type: String,
    require: true,
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
  image: {
    data: Buffer,
    contentType: String,
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
  desciption: {
    type: String,
    require: false,
  },
  blog: {},
  rate: {
    type: Number,
    require: false,
  },
});

let Product = mongoose.model("Product", ProductSchema);

module.exports = { Product };
