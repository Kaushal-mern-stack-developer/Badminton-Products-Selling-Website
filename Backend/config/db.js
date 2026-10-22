const mongoose = require("mongoose");

// Connects to the local MongoDB server (the same one mongosh connects to)
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/badminton_db";
    await mongoose.connect(uri);
    console.log("MongoDB connected -> " + uri);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.error("Make sure MongoDB is running (start 'mongod' and test with 'mongosh').");
    process.exit(1);
  }
};

module.exports = connectDB;
