const mongoose = require("mongoose");

const specificationSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },

    detail: [
        {
            name: String,
            value: String,
        },
    ],
});

let Specification = mongoose.model("specification", specificationSchema);

module.exports = { Specification };
