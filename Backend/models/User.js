const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }, // stored as "salt:hash" (never plain text)
    role: { type: String, enum: ["user", "admin"], default: "user" },
    phone: { type: String, default: "" },
    address: { type: String, default: "" },
  },
  { timestamps: true }
);

// Password hashing with Node's built-in crypto (no bcrypt needed)
userSchema.statics.hashPassword = function (plain) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(plain, salt, 64).toString("hex");
  return salt + ":" + hash;
};

userSchema.methods.checkPassword = function (plain) {
  const [salt, hash] = this.password.split(":");
  const test = crypto.scryptSync(plain, salt, 64).toString("hex");
  return test === hash;
};

module.exports = mongoose.model("User", userSchema);
