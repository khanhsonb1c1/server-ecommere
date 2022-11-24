const commentController = require("../controllers/blog/commentController");

const router = require("express").Router();

router.post("/", commentController.addComment);

router.get("/", commentController.getAllComment);

// router.get("/:id", blogController.getBlogDetail);

// router.put("/:id", blogController.updateBlog);

// router.delete("/:id", blogController.deleteBlog);

module.exports = router;
