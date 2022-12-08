const { Cart } = require("../models/cart");
const { User } = require("../models/user");

const cartController = {
  addCart: async (req, res) => {
    try {
      const newCart = new Cart({
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
    try {
      const PAGE_SIZE = 12;
      const page = parseInt(req.query.page);
      const Status = req.query.status;
      const user = req.query.user;

      if (req.query.status && req.query.user) {
        const skip = (page - 1) * PAGE_SIZE;
        const cart = await Cart.find({
          $and: [{ status: Status }, { user: user }],
        })
          .populate({ path: "product_list", populate: { path: "product" } })
          .populate("user", "full_name")
          .skip(skip)
          .limit(PAGE_SIZE);

        const total = Math.ceil(cart.length / PAGE_SIZE);

        res
          .status(200)
          .json({ last_page: total, current_page: page, data: cart });
      } else if (req.query.user) {
        const skip = (page - 1) * PAGE_SIZE;
        const cart = await Cart.find({
          user: user,
        })
          .populate({ path: "product_list", populate: { path: "product" } })
          .populate("user", "full_name")
          .skip(skip)
          .limit(PAGE_SIZE);

        const total = Math.ceil(cart.length / PAGE_SIZE);

        res
          .status(200)
          .json({ last_page: total, current_page: page, data: cart });
      } else if (req.query.status) {
        const skip = (page - 1) * PAGE_SIZE;
        const cart = await Cart.find({
          status: Status,
        })
          .populate({ path: "product_list", populate: { path: "product" } })
          .populate("user", "full_name")
          .skip(skip)
          .limit(PAGE_SIZE);

        const total = Math.ceil(cart.length / PAGE_SIZE);

        res
          .status(200)
          .json({ last_page: total, current_page: page, data: cart });
      } else {
        const skip = (page - 1) * PAGE_SIZE;
        const cartz = await Cart.find({
          $or: [
            { status: "close" },
            { status: "create" },
            { status: "shipment" },
            { status: "complete" },
          ],
        })
          .populate({ path: "product_list", populate: { path: "product" } })
          .populate("user", "full_name")
          .skip(skip)
          .limit(PAGE_SIZE);

        const totalz = Math.ceil(cartz.length / PAGE_SIZE);

        res
          .status(200)
          .json({ last_page: totalz, current_page: page, data: cartz });
      }
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

  getCartDefault: async (req, res) => {
    try {
      const user_id = req.query.id;
      const status = req.query.status;
      const cart = await Cart.find({
        $and: [{ status: status }, { user: user_id }],
      })
        .populate({
          path: "product_list",
          populate: { path: "product" },
        })
        .populate("user");

      if (cart.length < 1) {
        const newCart = new Cart({
          user: user_id,
          status: "open",
          cart_id: Math.round(+new Date() / 1000),
        });
        const saveCart = await newCart.save();

        const user = User.findById(user_id);
        // ! add to user
        await user.updateOne({
          $push: { cart: saveCart._id },
        });

        res.status(200).json([saveCart]);
      } else res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateCart: async (req, res) => {
    try {
      const status = req.body.status;
      const total = req.body.total;

      const cart = await Cart.findById(req.params.id);
      await cart.updateOne({
        status: status,
        total: total,
      });
      res.status(200).json("Updated successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteCart: async (req, res) => {
    try {
      await User.updateMany(
        { cart: req.params.id },
        { $pull: { cart: req.params.id } }
      );
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = cartController;
// module.exports = upload;
