const categoryController = require("../controllers/categoryController");

const router = require("express").Router();

router.post("/", categoryController.addCategory);

router.get("/", categoryController.getAllCategory);

router.put("/:id", categoryController.updateCategory);

router.delete("/:id", categoryController.deleteCategory);

router.get("/:id", categoryController.getDetailcategory);

module.exports = router;
