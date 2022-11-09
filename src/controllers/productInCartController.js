const { Cart } = require("../models/cart");

const {ProductInCart} = require("../models/productInCart");

const cartController = {

    addToCart: async (req, res) => {
        try {
            const newProductInCart = new ProductInCart({
              product: req.params.id,
              quantity: req.quantity,
              cart: req.cart,
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

    removeInCart: async (req, res) => {
      try {
        await Category.updateMany(
          { product: req.params.id },
          { $pull: { product: req.params.id } }
        );
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted successfully !");
      } catch (error) {
        res.status(500).json(error);
      }
    },

   
 
};

module.exports = cartController ;
// module.exports = upload;
