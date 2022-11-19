const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  cart_id: {
    type: String,
    require: true,
    unique: true,
  },

  status: {
    type: String,
    require: true,
  },

  created_at: {
    type: Number,
    default: Math.round(+new Date() / 1000),
  },

  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductInCart",
    },
  ],
});

let Cart = mongoose.model("Cart", CartSchema);

module.exports = { Cart };
