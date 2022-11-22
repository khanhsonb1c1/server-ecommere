const cartController = require("../controllers/cartController");

const router = require("express").Router();

router.post("/", cartController.addCart);

router.get("/", cartController.getAllCart);

router.get("/:id", cartController.getCartDetail);

router.put("/:id", cartController.updateCart);

router.delete("/:id", cartController.deleteCart);

module.exports = router;
