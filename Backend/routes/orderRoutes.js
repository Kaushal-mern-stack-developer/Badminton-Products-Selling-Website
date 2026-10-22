const express = require("express");
const router = express.Router();
const { placeOrder, getUserOrders, getAllOrders } = require("../controllers/orderController");
const adminOnly = require("../middleware/adminOnly");

router.post("/", placeOrder);
router.get("/user/:userId", getUserOrders);
router.get("/", adminOnly, getAllOrders);

module.exports = router;
