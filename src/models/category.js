const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  category_id: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  image_url: {
    type: String,
    require: false,
  },
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

let Category = mongoose.model("Category", CategorySchema);

module.exports = { Category };
