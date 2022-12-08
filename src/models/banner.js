const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  status: {
    type: Number,
    default: 2,
  },

  //   name: {
  //     type: String,
  //     require: true,
  //   },

  //   description: {
  //     type: String,
  //   },

  //   price: {
  //     type: String,
  //     require: true,
  //   },

  created_at: {
    type: Number,
    default: Math.round(+new Date() / 1000),
  },

  imageUrl: {
    type: String,
    require: false,
  },
});

let Banner = mongoose.model("Banner", bannerSchema);

module.exports = { Banner };
