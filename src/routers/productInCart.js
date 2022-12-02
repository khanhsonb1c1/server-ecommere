const productInCartController = require("../controllers/productInCartController");
//   const middlewareAuth = require("../middlewares/middlewareAuth");

const router = require("express").Router();

router.post("/", productInCartController.addToCart);
router.delete("/:id", productInCartController.removeInCart);
router.put("/:id", productInCartController.updateProductInCart);
router.get("/:id", productInCartController.getProductInCart);
router.get("/", productInCartController.getAll);

module.exports = router;
