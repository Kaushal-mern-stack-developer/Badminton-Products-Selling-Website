const User = require("../models/User");

// remove the password before sending a user to the frontend
const safeUser = (u) => ({
  _id: u._id,
  name: u.name,
  email: u.email,
  role: u.role,
  phone: u.phone,
  address: u.address,
});

// POST /api/auth/register  (creates a normal "user" account)
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }
    if (password.length < 4) {
      return res.status(400).json({ message: "Password must be at least 4 characters" });
    }
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) return res.status(400).json({ message: "Email is already registered" });

    const user = await User.create({
      name,
      email,
      phone,
      address,
      role: "user",
      password: User.hashPassword(password),
    });
    res.status(201).json(safeUser(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/auth/login   body: { email, password, role }
exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email: (email || "").toLowerCase() });
    if (!user || !user.checkPassword(password || "")) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (role && user.role !== role) {
      return res.status(403).json({ message: "This account is not a " + role + " account" });
    }
    res.json(safeUser(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/auth/profile/:id
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, phone, address },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(safeUser(user));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Creates the one default admin account on first start
exports.seedAdmin = async () => {
  const email = "admin@badminton.com";
  if (await User.findOne({ email })) return;
  await User.create({
    name: "Store Admin",
    email,
    role: "admin",
    password: User.hashPassword("admin123"),
  });
  console.log("Default admin created -> " + email + " / admin123");
};
