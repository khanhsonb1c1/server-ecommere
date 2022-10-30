const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  getAllUser: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getDetailUser: async (req, res) => {
    try {
      // req.params.id
      //   const user = await User.find({
      //     user_name: req.params.id,
      //   });
      const user = await User.findById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
