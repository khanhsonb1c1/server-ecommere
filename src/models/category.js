const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  category_id: {
    require: false,
    type: String,
  },
  name: {
    require: false,
    type: String,
  },
  image: {
    data: Buffer,
    contentType: String,
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
