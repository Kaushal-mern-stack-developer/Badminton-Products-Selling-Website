const express = require("express");
const router = express.Router();
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const adminOnly = require("../middleware/adminOnly");

router.get("/", getProducts); // everyone can view
router.post("/", adminOnly, addProduct); // admin only
router.put("/:id", adminOnly, updateProduct); // admin only
router.delete("/:id", adminOnly, deleteProduct); // admin only

module.exports = router;
