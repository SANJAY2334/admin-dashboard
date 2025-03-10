import express from "express";
import {
  register,
  login,
  changePassword,
  forgotPassword,
  resetPassword,
} from "../Controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Use RESTful HTTP methods
router.post("/register", register);
router.post("/login", login);
router.put("/update-password", authMiddleware, changePassword); // ⬅️ Use PUT for updating password
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword); // ⬅️ Use PUT for password reset

console.log("✅ Reset Password route registered.");

export default router;
