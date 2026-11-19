import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 9000;
const mongoURI =
  process.env.MONGO_URI ||
  "mongodb+srv://admin:Cherry1234@cluster0.s735bf2.mongodb.net/?retryWrites=true&w=majority";
const dbName = process.env.DB_NAME || "auth_todos_db";

connectDB(mongoURI, dbName);

app.use(express.json());

// Ensure database connection in serverless
app.use(async (req, res, next) => {
  await connectDB(mongoURI, dbName);
  next();
});

// Routes for todo API
app.use("/api/v1/todos", todoRoutes);
// Routes for user API
app.use("/api/v1/users", userRoutes);

// Test route
app.get("/", (req, res) => {
  res.status(200).json({ message: "MVC Auth & Todo API is running" });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

export default app;
