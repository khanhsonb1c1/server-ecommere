const mongoose = require("mongoose");

const ProducerSchema = new mongoose.Schema({
  producer_id: {
    require: false,
    type: String,
  },
  name: {
    require: false,
    type: String,
  },

  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

let Producer = mongoose.model("Producer", ProducerSchema);

module.exports = { Producer };
