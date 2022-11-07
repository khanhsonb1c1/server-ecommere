const userController = require("../controllers/userController");
// const middlewareAuth = require("../middlewares/middlewareAuth");

const router = require("express").Router();

// router.get("/", middlewareAuth.verifyAdmin, userController.getAllUser);
// router.get(
//   "/:id",
//   middlewareAuth.verifyOwnerAndAdmin,
//   userController.getDetailUser
// );

router.get("/", userController.getAllUser);
router.get("/:id", userController.getDetailUser);
router.put("/:id", userController.updateUser);

module.exports = router;
