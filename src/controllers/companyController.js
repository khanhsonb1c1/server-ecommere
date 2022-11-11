const { Company } = require("../models/company");
const { Product } = require("../models/product");

const companyController = {
  addCompany: async (req, res) => {
    try {
      const newCompany = new Company({
        name: req.body.name,
        company_id: req.body.company_id,
      });
      const saveCompany = await newCompany.save();
      res.status(200).json({
        message: "successfully.",
        create_company: saveCompany,
      });
    } catch (error) {
      res.send(error);
    }
  },

  getAllCompany: async (req, res) => {
    try {
      const company = await Company.find().populate("product");
      res.status(200).json({ data: company });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  getDetailCompany: async (req, res) => {
    try {
      const company = await Company.find({
        company_id: req.params.id,
      }).populate("product");

      res.status(200).json(company);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateCompany: async (req, res) => {
    try {
      const company = await Company.findById(req.params.id);
      await company.updateOne({ $set: req.body });
      res.status(200).json("Updated successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteCompany: async (req, res) => {
    try {
      await Product.updateMany({ company: req.params.id }, { company: null });
      await Company.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = companyController;
// module.exports = upload;
