const mongoose = require("mongoose");

const ProductInCartSchema = new mongoose.Schema({
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cart",
  },

  quantity: {
    type: Number,
    require: true,
    default: 0,
  },

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  created_at: {
    type: Number,
    default: Math.round(+new Date() / 1000),
  },
});

let ProductInCart = mongoose.model("ProductInCart", ProductInCartSchema);

module.exports = { ProductInCart };
