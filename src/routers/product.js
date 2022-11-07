const {
  productController,
  upload,
} = require("../controllers/productController");
const middlewareAuth = require("../middlewares/middlewareAuth");

const router = require("express").Router();

router.post("/", upload.single("imageUrl"), productController.addProduct);

router.get("/", productController.getAllProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);
router.get("/:id", productController.getDetailProduct);

module.exports = router;
