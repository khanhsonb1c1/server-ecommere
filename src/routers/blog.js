const {
  blogController,
  upload,
} = require("../controllers/blog/blogController");

const router = require("express").Router();

router.post("/", upload.single("imageUrl"), blogController.addBlog);

router.get("/", blogController.getAllBlog);

router.get("/:id", blogController.getBlogDetail);

router.put("/:id", blogController.updateBlog);

router.delete("/:id", blogController.deleteBlog);

module.exports = router;
