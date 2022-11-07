const {
  categoryController,
  upload,
} = require("../controllers/categoryController");
const express = require("express");

const router = express.Router();

router.post("/", upload.single("imageUrl"), categoryController.addCategory);

router.get("/", categoryController.getAllCategory);

router.put("/:id", categoryController.updateCategory);

router.delete("/:id", categoryController.deleteCategory);

router.get("/:id", categoryController.getDetailcategory);

module.exports = router;
