const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user_id: {
    type: String,
    require: true,
  },

  cart_id: {},

  list_product: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
      },
    },
  ],
});

let Cart = mongoose.model("Cart", CartSchema);

module.exports = { Cart };
