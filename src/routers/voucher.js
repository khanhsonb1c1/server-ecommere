const voucherController = require("../controllers/voucherController");

const router = require("express").Router();

router.post("/", voucherController.addVoucher);

router.get("/", voucherController.getAllVoucher);

router.delete("/:id", voucherController.deleteVoucher);

module.exports = router;
