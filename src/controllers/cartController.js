const { Cart } = require("../models/cart");
const { User } = require("../models/user");

const cartController = {
  addCart: async (req, res) => {
    try {
      const newCart = new Cart({
        cart_id: req.body.cart_id,
        user: req.body.user,
      });
      const saveCart = await newCart.save();
      if (req.body.user) {
        const user = User.findById(req.body.user);
        // ! add to user
        await user.updateOne({
          $push: { cart: saveCart._id },
        });
      }

      res.status(200).json({
        message: "add new cart successfully.",
        savecart: saveCart,
      });
    } catch (error) {
      res.send(error);
    }
  },

  getAllCart: async (req, res) => {
    const PAGE_SIZE = 12;
    const page = req.query.page;

    try {
      const skip = (page - 1) * PAGE_SIZE;
      const cart = await Cart.find()
        .populate({ path: "product_list", populate: { path: "product" } })
        .populate("user", "full_name")
        .skip(skip)
        .limit(PAGE_SIZE);

      const carts = await Cart.find();

      const total = Math.ceil(carts.length / PAGE_SIZE);

      res
        .status(200)
        .json({ last_page: total, current_page: page, data: cart });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getCartDetail: async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.id)
        .populate("user")
        .populate({
          path: "product_list",
          populate: { path: "product" },
        });
      // .populate("product");

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateCart: async (req, res) => {
    try {
      const cart = await Cart.findById(req.params.id);
      await cart.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteCart: async (req, res) => {
    try {
      await Product.updateMany({ category: req.params.id }, { category: null });
      await Category.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = cartController;
// module.exports = upload;
