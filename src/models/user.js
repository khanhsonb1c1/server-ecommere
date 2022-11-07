const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_name: {
    type: String,
    require: true,
    minlenght: 6,
    maxlenght: 20,
    unique: true, // ko trùng user,
  },

  password: {
    type: String,
    require: true,
    minlenght: 6,
  },

  role: {
    type: String,
    require: false,
    default: "customer",
  },

  full_name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: false,
    minlenght: 6,
    maxlenght: 50,
    unique: true,
  },

  phone: {
    type: String,
    require: false,
    minlenght: 6,
    maxlenght: 20,
  },

  ward_id: {
    type: String,
    require: false,
  },

  address_detail: {
    type: String,
    require: false,
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
    },
  ],

  created: {
    require: false,
    type: String,
  },

  updated: {
    require: false,
    type: String,
  },
});

let User = mongoose.model("User", UserSchema);

module.exports = { User };
