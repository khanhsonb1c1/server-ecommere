const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = []; //! Đổi lại cái này thành 1 bảng trong Db thì hợp lý hơn

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

  // getAuth: async (req, res) => {
  //   try {
  //     const salt = await bcrypt.genSalt(10);
  //     const hashed = await bcrypt.hash(req.body.password, salt);

  //     // ? create new user
  //     const newUser = await new User({
  //       user_name: req.body.user_name,
  //       email: req.body.email,
  //       password: hashed,
  //       full_name: req.body.full_name,
  //       address_detail: req.body.address_detail,
  //       phone: req.body.phone,
  //     });

  //     // ? save to DB
  //     const user = await newUser.save();

  //     res.status(200).json(user);
  //   } catch (error) {
  //     res.status(500).json(error);
  //   }
  // },

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
        address_detail: req.body.address_detail,
        phone: req.body.phone,
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
        return res.status(404).json("Sai user_name");
      }

      const validPassWord = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassWord) {
        return res.status(404).json("Wrong pass_word");
      }

      if (user && validPassWord) {
        // TODO Create token
        const access_token = authController.createAccessToken(user);

        // TODO Refresh Token
        const refresh_token = authController.createAccessTokenRefresh(user);
        refreshTokens.push(refresh_token);
        // TODO add refresh_token to Cookies :
        res.cookie("refresh_token", refresh_token, {
          httpOnly: true,
          secure: false, // ! change to TRUE when deploy.
          path: "/",
          sameSite: "strict",
        });
        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, access_token });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // ! ==================== LOGOUT =========================

  logoutUser: async (req, res) => {
    res.clearCookie("refresh_token");
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refresh_token
    );
    res.status(200).json("logout successfully");
  },

  // !====================== REFRESH TOKEN =====================

  refreshToken: async (req, res) => {
    try {
      // get refresh token from user
      const refresh_token = req.cookies.refresh_token;
      if (!refresh_token)
        return res.status(401).json("This action is unauthorized");
      // check refresh token đó có phải của mình k ?
      if (!refreshTokens.includes(refresh_token)) {
        return res.status(403).json("refresh token is not valid");
      }
      //.
      jwt.verify(
        refresh_token,
        process.env.JWT_ACCESS_KEY_REFRESH,
        (error, user) => {
          if (error) {
            console.log(error);
          }

          // lọc cái arr token ra
          refreshTokens = refreshTokens.filter(
            (token) => token !== refresh_token
          );

          // create new access token and refresh token.
          const newAccessToken = authController.createAccessToken(user);
          const newRefreshToken = authController.createAccessTokenRefresh(user);
          refreshTokens.push(refresh_token);
          res.cookie("refresh_token", newRefreshToken, {
            httpOnly: true,
            secure: false, // ! change to TRUE when deploy.
            path: "/",
            sameSite: "strict",
          });

          res.status(200).json({ access_token: newAccessToken });
        }
      );
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authController;
