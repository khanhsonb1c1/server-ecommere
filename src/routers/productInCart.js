const { productInCartController } = require("../controllers/productInCartController");
//   const middlewareAuth = require("../middlewares/middlewareAuth");

const router = require("express").Router();

router.post("/:id", productInCartController.addToCart);
router.delete("/:id", productInCartController.removeInCart);

module.exports = router;
