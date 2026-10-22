const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["Racket", "Shuttlecock", "Shoes", "Bag", "Apparel", "Accessories"],
    },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    weight: { type: String, default: "-" }, // e.g. "85g (4U)"
    rating: { type: Number, min: 0, max: 5, default: 4 },
    description: { type: String, default: "" },
    image: { type: String, default: "" }, // image URL (optional)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
