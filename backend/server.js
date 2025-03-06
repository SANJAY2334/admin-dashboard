import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

<<<<<<< HEAD
// ✅ CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
=======

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
>>>>>>> a60d90c9f5f46c65fbd65d3ca34a8f47c0eac978
app.use(express.json());


app.use("/api/auth", authRoutes);
app.get("/", (req, res) => res.send("API is running..."));

// ✅ MongoDB Connection
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env");
  process.exit(1);
}

<<<<<<< HEAD
=======

>>>>>>> a60d90c9f5f46c65fbd65d3ca34a8f47c0eac978
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
