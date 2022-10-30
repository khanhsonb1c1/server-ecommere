const userController = require("../controllers/userController");
const middlewareAuth = require("../middlewares/middlewareAuth");

const router = require("express").Router();

router.get("/", middlewareAuth.verifyAdmin, userController.getAllUser);
router.get(
  "/:id",
  middlewareAuth.verifyOwnerAndAdmin,
  userController.getDetailUser
);

module.exports = router;
