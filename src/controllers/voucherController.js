const { Voucher } = require("../models/voucher");

const voucherController = {
  addVoucher: async (req, res) => {
    try {
      const newCompany = new Voucher({
        code: req.body.code,
        value: req.body.value,
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

  getAllVoucher: async (req, res) => {
    try {
      const company = await Voucher.find();
      res.status(200).json({ data: company });
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //   updateCompany: async (req, res) => {
  //     try {
  //       const company = await Company.findById(req.params.id);
  //       await company.updateOne({ $set: req.body });
  //       res.status(200).json("Updated successfully !");
  //     } catch (error) {
  //       res.status(500).json(error);
  //     }
  //   },

  deleteVoucher: async (req, res) => {
    try {
      await Voucher.findByIdAndDelete(req.params.id);
      res.status(200).json("Deleted successfully !");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = voucherController;
// module.exports = upload;
