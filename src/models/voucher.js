const mongoose = require("mongoose");

const voucherSchema = new mongoose.Schema({
  code: {
    type: String,
    require: true,
  },

  value: {
    type: Number,
    require: true,
  },

  created_at: {
    type: Number,
    default: Math.round(+new Date() / 1000),
  },
});

let Voucher = mongoose.model("Voucher", voucherSchema);

module.exports = { Voucher };
