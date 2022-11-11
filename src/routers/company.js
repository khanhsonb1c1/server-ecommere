const CompanyController = require("../controllers/CompanyController");

const router = require("express").Router();

router.post("/", CompanyController.addCompany);

router.get("/", CompanyController.getAllCompany);

router.get("/:id", CompanyController.getDetailCompany);

router.put("/:id", CompanyController.updateCompany);

router.delete("/:id", CompanyController.deleteCompany);

module.exports = router;
