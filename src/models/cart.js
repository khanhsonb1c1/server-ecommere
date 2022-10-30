const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  user_id: {
    type: String,
    require: true,
  },
  product: {
    type: [],
    require: false,
  },
  quantity: {
    type: String,
    require: false,
  },

  updated: {
    type: String,
    require: false,
  },
});

let Cart = mongoose.model("Cart", CartSchema);

module.exports = { Cart };
