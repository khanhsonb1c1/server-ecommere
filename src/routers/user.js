const userController = require("../controllers/userController");
const middlewareAuth = require("../middlewares/middlewareAuth");

const router = require("express").Router();

router.get("/", middlewareAuth.verifyAdmin, userController.getAllUser);
router.get(
  "/:id",
  middlewareAuth.verifyOwnerAndAdmin,
  userController.getDetailUser
);

router.put(
  "/:id",
  middlewareAuth.verifyOwnerAndAdmin,
  userController.updateUser
);

router.delete(
  "/:id",
  middlewareAuth.verifyOwnerAndAdmin,
  userController.deleteUser
);

module.exports = router;
