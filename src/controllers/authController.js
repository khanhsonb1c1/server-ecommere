const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  // ** Create AccessToken:

  createAccessToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_ACCESS_KEY, // ! đây là key bảo mật
      { expiresIn: "2h" } // ! Thời gian hết hạn token
    );
  },

  createAccessTokenRefresh: (user) => {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_ACCESS_KEY_REFRESH,
      { expiresIn: "1d" }
    );
  },

  // ! =============== REGISTER =====================

  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      // ? create new user
      const newUser = await new User({
        user_name: req.body.user_name,
        email: req.body.email,
        password: hashed,
        full_name: req.body.full_name,
      });

      // ? save to DB
      const user = await newUser.save();

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // ! =================== LOGIN =======================

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ user_name: req.body.user_name });
      if (!user) {
        res.status(404).json("Sai user_name");
      }

      const validPassWord = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassWord) {
        res.status(404).json("Wrong pass_word");
      }

      if (user && validPassWord) {
        // TODO Create token
        const access_token = authController.createAccessToken(user);

        // TODO Refresh Token
        const refresh_token = authController.createAccessTokenRefresh(user);

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, access_token, refresh_token });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authController;
