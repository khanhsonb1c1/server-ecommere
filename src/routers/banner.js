const { bannerController, upload } = require("../controllers/bannerController");

const router = require("express").Router();

router.post("/", upload.single("imageUrl"), bannerController.addBanner);

router.get("/", bannerController.getAllBlog);

router.get("/default", bannerController.getDefalut);

router.put("/:id", bannerController.updateBlog);

router.delete("/:id", bannerController.deleteBlog);

module.exports = router;
