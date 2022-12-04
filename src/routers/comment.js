const commentController = require("../controllers/blog/commentController");

const router = require("express").Router();

router.post("/", commentController.addComment);

router.get("/", commentController.getAllComment);

router.get("/:id", commentController.getDetailComment);

router.put("/:id", commentController.updateComment);

router.delete("/:id", commentController.deleteComment);

module.exports = router;
