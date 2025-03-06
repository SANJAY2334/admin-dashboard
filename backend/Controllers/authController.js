<<<<<<< HEAD
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    console.log("Received Login Data:", req.body); // Debugging log

    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error." });
  }
};
=======
app.post("/api/auth/register", (req, res) => {
    console.log("Received Data:", req.body);  
    
    const { username, name, email, password } = req.body;
  
    if (!username || !name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    res.send("Received");  
  });
  
>>>>>>> a60d90c9f5f46c65fbd65d3ca34a8f47c0eac978
