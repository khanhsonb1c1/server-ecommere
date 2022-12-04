const mongoose = require("mongoose");

const statisticalSchema = new mongoose.Schema({
  detail: [
    {
      name: String,
      value: String,
      created_at: {
        type: Number,
        default: Math.round(+new Date() / 1000),
      },
    },
  ],
});

let Statistial = mongoose.model("Statistial", statisticalSchema);

module.exports = { Statistial };
