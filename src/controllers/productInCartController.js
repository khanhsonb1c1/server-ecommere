const { Cart } = require("../models/cart");
const { ProductInCart } = require("../models/productInCart");

const productInCartController = {
  addToCart: async (req, res) => {
    try {
      // ===== check product trùng =====

      const product_list = await ProductInCart.find({
        $and: [{ cart: req.body.cart }, { product: req.body.product }],
      });

      if (product_list.length >= 1) {
        const product_in_cart_default = product_list[0];
        const getId = product_in_cart_default._id;

        const updateCart = await ProductInCart.findById(getId);

        const getQuantity = parseInt(req.body.quantity);

        await updateCart.updateOne({
          quantity: product_in_cart_default.quantity + getQuantity,
        });
        res.status(200).json({
          message: "successfully.",
          add_product_to_cart: updateCart,
        });
      } else {
        const newProductInCart = new ProductInCart({
          product: req.body.product,
          quantity: req.body.quantity,
          cart: req.body.cart,
        });
        const saveProductInCart = await newProductInCart.save();
        if (req.body.cart) {
          const cart = Cart.findById(req.body.cart);

          await cart.updateOne({
            $push: { product_list: saveProductInCart._id },
          });
        }

        res.status(200).json({
          message: "successfully.",
          add_product_to_cart: saveProductInCart,
        });
      }

      // ===== check product trùng =====
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getProductInCart: async (req, res) => {
    try {
      const productInCart = await ProductInCart.findById(
        req.params.id
      ).populate("product");
      res.status(200).json(productInCart);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getAll: async (req, res) => {
    try {
      const productInCart = await ProductInCart.find({
        $and: [{ cart: req.body.cart }, { product: req.body.product }],
      });
      res.status(200).json(productInCart);
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
