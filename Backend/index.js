require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");
const { seedAdmin } = require("./controllers/authController");
const { seedProducts } = require("./controllers/productController");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => res.send("Badminton Product Selling API is running"));

const PORT = process.env.PORT || 5001;

connectDB().then(async () => {
  await seedAdmin();
  await seedProducts();
  app.listen(PORT, () => console.log("Server running on http://localhost:" + PORT));
});
