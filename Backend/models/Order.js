const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    userName: { type: String },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        qty: Number,
      },
    ],
    total: { type: Number, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    payment: { type: String, default: "Cash on Delivery" },
    status: { type: String, default: "Placed" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
