const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    company_id: {
        require: true,
        unique: true,
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

let Company = mongoose.model("Company", CompanySchema);

module.exports = { Company };
