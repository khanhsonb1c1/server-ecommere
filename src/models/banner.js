const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  status: {
    type: Number,
    default: 4,
  },

  // code: {
  //   type: String,
  //   require: true,
  //   unique: true,
  // },

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
