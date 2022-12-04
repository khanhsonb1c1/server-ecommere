const repCommentController = require("../controllers/blog/repCommentController");

const router = require("express").Router();

router.post("/", repCommentController.newRepComment);

router.put("/:id", repCommentController.updateRepComment);

router.delete("/:id", repCommentController.deleteRepComment);

module.exports = router;
