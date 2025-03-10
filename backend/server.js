import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import ticketsRoutes from "./routes/tickets.js";

dotenv.config();
const app = express();

// ✅ Validate ENV variables
if (!process.env.MONGO_URI) {
  console.error("❌ Error: MONGO_URI is missing in .env");
  process.exit(1);
}
if (!process.env.PORT) {
  console.warn("⚠️ Warning: PORT is missing in .env. Using default 5000.");
}

// ✅ Middleware
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Register Routes
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketsRoutes);

// ✅ Debugging Route Registration (Only in Development)
const logRoutes = () => {
  console.log("📌 Registered Routes:");
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      console.log(`✅ ${middleware.route.path}`);
    } else if (middleware.name === "router") {
      middleware.handle.stack.forEach((route) => {
        if (route.route) console.log(`✅ ${route.route.path}`);
      });
    }
  });
};
if (process.env.NODE_ENV !== "production") logRoutes();

// ✅ Test Route
app.get("/", (req, res) => res.send("API is running..."));

// ✅ Mongoose Config
mongoose.set("strictQuery", true); // Suppress deprecated warning

// ✅ Start MongoDB & Server
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Auth routes initialized at /api/auth");
    console.log("✅ MongoDB Connected");

    const PORT = process.env.PORT || 5000;
    console.log("🔍 Registered Routes:");
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(`✅ ${middleware.route.path}`);
  } else if (middleware.name === "router") {
    middleware.handle.stack.forEach((route) => {
      if (route.route) {
        console.log(`✅ ${route.route.path}`);
      }
    });
  }
});

    const server = app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

    // ✅ Graceful Shutdown
    process.on("SIGINT", async () => {
      console.log("🔴 Closing server...");
      await mongoose.connection.close();
      server.close(() => {
        console.log("✅ Server closed");
        process.exit(0);
      });
    });

    process.on("SIGTERM", async () => {
      console.log("🔴 Closing server...");
      await mongoose.connection.close();
      server.close(() => {
        console.log("✅ Server closed");
        process.exit(0);
      });
    });

  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

// ✅ Start Server
startServer();
