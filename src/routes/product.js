const express = require("express");
const {
  getProducts,
  createProduct,
  deleteProduct,
  editProduct,
} = require("../controllers/product.js");
const { authenticate } = require("../middleware/authenticate.js");

const router = express.Router();

router.get("/", authenticate, getProducts);
router.post("/", authenticate, createProduct);
router.delete("/", authenticate, deleteProduct);
router.put("/", authenticate, editProduct);

module.exports = router;
