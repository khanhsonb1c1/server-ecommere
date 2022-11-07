const mongoose = require("mongoose");

const ProductInCartSchema = new mongoose.Schema({
    cart_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart",
    },

    quantity: {
        type: Number,
        require: true,
        default: 0,
    },

    
});

let ProductInCart = mongoose.model("ProductInCart", ProductInCartSchema);

module.exports = { ProductInCart };
