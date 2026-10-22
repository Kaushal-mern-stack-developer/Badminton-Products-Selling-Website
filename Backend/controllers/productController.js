const Product = require("../models/Product");

// GET /api/products  -> everyone
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/products  -> admin
exports.addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /api/products/:id  -> admin
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/products/:id  -> admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Adds a few sample products the first time the server starts
exports.seedProducts = async () => {
  if ((await Product.countDocuments()) > 0) return;
  await Product.insertMany([
    { name: "Astrox 88S Pro", brand: "Yonex", category: "Racket", price: 14999, stock: 12, weight: "83g (4U)", rating: 4.8, description: "Attack-focused racket with rotational generator system for powerful smashes." },
    { name: "Thruster K Falcon", brand: "Victor", category: "Racket", price: 8499, stock: 20, weight: "85g (4U)", rating: 4.5, description: "Head-heavy racket built for aggressive all-court players." },
    { name: "Nanoflare 800", brand: "Yonex", category: "Racket", price: 12999, stock: 8, weight: "84g (4U)", rating: 4.7, description: "Speed racket with a head-light balance for fast drives and quick defence." },
    { name: "Mavis 350 Nylon (Pack of 6)", brand: "Yonex", category: "Shuttlecock", price: 1099, stock: 60, weight: "5g each", rating: 4.4, description: "Durable nylon shuttles, ideal for club and practice sessions." },
    { name: "AS-50 Feather Shuttle (Dozen)", brand: "Yonex", category: "Shuttlecock", price: 3499, stock: 35, weight: "5g each", rating: 4.9, description: "Tournament grade goose-feather shuttles with excellent flight stability." },
    { name: "Power Cushion 65 Z3", brand: "Yonex", category: "Shoes", price: 9999, stock: 15, weight: "310g", rating: 4.6, description: "Lightweight court shoes with superb cushioning and grip." },
    { name: "A920 Court Shoes", brand: "Victor", category: "Shoes", price: 6499, stock: 18, weight: "330g", rating: 4.3, description: "Stable, breathable shoes for quick lateral movement." },
    { name: "Pro Tournament Kitbag", brand: "Li-Ning", category: "Bag", price: 4299, stock: 14, weight: "1.1kg", rating: 4.5, description: "Spacious 3-compartment bag with thermal racket pocket." },
    { name: "Dry-Fit Performance Jersey", brand: "Li-Ning", category: "Apparel", price: 1599, stock: 40, weight: "180g", rating: 4.2, description: "Sweat-wicking jersey that keeps you cool through long rallies." },
    { name: "Super Grap Overgrip (Pack of 3)", brand: "Yonex", category: "Accessories", price: 399, stock: 100, weight: "20g", rating: 4.7, description: "Tacky, absorbent overgrips for a secure hold." },
  ]);
  console.log("Sample products added");
};
