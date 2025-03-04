import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();


app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());


app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
