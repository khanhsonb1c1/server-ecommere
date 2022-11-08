const { Cart } = require("../models/cart");

const {ProductInCart} = require("../models/productInCart");

const cartController = {

    addToCart: async (req, res) => {
        try {
            const newProductInCart = new ProductInCart({
              name: req.body.name,
              category_id: req.body.category_id,
              imageUrl: req.file.path,
            });
            const saveCategory = await newCategory.save();
            res.status(200).json({
              message: "successfully.",
              create_category: saveCategory,
              // file: req.file,
            });
          } catch (error) {
            res.send(error);
          }
    },

    removeInCart: async (req, res) => {
        
    },

   
 
};

module.exports = cartController ;
// module.exports = upload;
