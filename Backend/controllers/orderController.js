const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

// POST /api/orders   (Buy Now / Cart checkout)
exports.placeOrder = async (req, res) => {
  try {
    const { userId, items, address, phone, payment } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(401).json({ message: "Please login to place an order" });
    if (!items || items.length === 0) return res.status(400).json({ message: "No items in order" });

    let total = 0;
    const orderItems = [];

    // check stock and calculate the total using prices stored in the database
    for (const item of items) {
      const p = await Product.findById(item.product);
      if (!p) return res.status(404).json({ message: "A product no longer exists" });
      if (p.stock < item.qty) {
        return res.status(400).json({ message: p.name + " has only " + p.stock + " left in stock" });
      }
      total += p.price * item.qty;
      orderItems.push({ product: p._id, name: p.name, price: p.price, qty: item.qty });
    }

    // reduce stock
    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.qty } });
    }

    const order = await Order.create({
      user: user._id,
      userName: user.name,
      items: orderItems,
      total,
      address,
      phone,
      payment,
    });
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders/user/:userId
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders   -> admin
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
