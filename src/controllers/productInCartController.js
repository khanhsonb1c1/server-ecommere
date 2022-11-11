const { Cart } = require("../models/cart");
const { ProductInCart } = require("../models/productInCart");

const productInCartController = {
  addToCart: async (req, res) => {
    try {
      const newProductInCart = new ProductInCart({
        product: req.params.id,
        quantity: req.body.quantity,
        cart: req.body.cart,
      });
      const saveProductInCart = await newProductInCart.save();
      if (req.body.cart) {
        const cart = Cart.findById(req.body.cart);
        // ? add to category
        await cart.updateOne({
          $push: { product: saveProductInCart._id },
        });
      }

      res.status(200).json({
        message: "successfully.",
        add_product_to_cart: saveProductInCart,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateProductInCart: async (req, res) => {
    try {
      const productInCart = await ProductInCart.findById(req.params.id);
      await productInCart.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  removeInCart: async (req, res) => {
    try {
      await Cart.updateMany(
        { product: req.params.id },
        { $pull: { product: req.params.id } }
      );
      await ProductInCart.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = productInCartController;
// module.exports = upload;
