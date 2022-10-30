const authController = require("../controllers/authController");
const middlewareAuth = require("../middlewares/middlewareAuth");

const router = require("express").Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.post("/refresh", authController.refreshToken);

router.post("/logout", authController.logoutUser);

module.exports = router;
