import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js"; // Ensure correct path
import verifyToken from "../middleware/verifyToken.js"; // JWT Middleware

const router = express.Router();

router.put("/reset-password", verifyToken, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // ✅ Validate input
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Both old and new passwords are required." });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: "New password must be at least 8 characters long." });
    }

    const userId = req.user?.id;
    if (!userId) {
      return res.status(403).json({ message: "Invalid or expired token." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // ✅ Compare old password
    const isMatch = await bcrypt.compare(oldPassword.trim(), user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect old password." });
    }

    // ✅ Hash new password
    user.password = await bcrypt.hash(newPassword.trim(), 10);
    await user.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("❌ Password Reset Error:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
});

export default router;
