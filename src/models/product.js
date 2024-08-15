const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
});

const ProductModel = mongoose.model("Product", productSchema);
module.exports = ProductModel;
