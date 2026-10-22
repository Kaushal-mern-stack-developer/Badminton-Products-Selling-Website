const User = require("../models/User");

// Simple role check: the frontend sends the logged-in user's id in the "x-user-id" header.
// Only users whose role is "admin" in the database are allowed through.
const adminOnly = async (req, res, next) => {
  try {
    const id = req.headers["x-user-id"];
    if (!id) return res.status(401).json({ message: "Please login first" });
    const user = await User.findById(id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid user" });
  }
};

module.exports = adminOnly;
