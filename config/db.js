import mongoose from "mongoose";

let isConnected = false;
const connectDB = async (mongoUri, dbName) => {
  if (isConnected || mongoose.connection.readyState >= 1) return;
  const uri =
    mongoUri ||
    process.env.MONGO_URI ||
    "mongodb+srv://admin:Cherry1234@cluster0.s735bf2.mongodb.net/?retryWrites=true&w=majority";
  const database = dbName || process.env.DB_NAME || "auth_todos_db";
  try {
    await mongoose.connect(uri, {
      dbName: database,
    });
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err.message);
  }
};

export default connectDB;
