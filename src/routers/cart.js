const cartController = require("../controllers/cartController");

const router = require("express").Router();

router.post("/", cartController.addCart);

router.get("/", cartController.getAllCart);

router.get("/:id", cartController.getCartDetail);

router.put("/", cartController.updateCart);

router.delete("/", cartController.deleteCart);

module.exports = router;
