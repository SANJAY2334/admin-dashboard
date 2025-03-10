import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: Token missing or invalid format." });
    }

    if (!process.env.JWT_SECRET) {
      console.error("❌ Error: Missing JWT_SECRET in environment variables.");
      return res.status(500).json({ message: "Server error: Missing JWT secret." });
    }

    const token = authHeader.replace("Bearer ", "").trim(); // Extracts token efficiently

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("❌ JWT Verification Error:", err.message);

        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Session expired. Please log in again." });
        } else {
          return res.status(403).json({ message: "Forbidden: Invalid token." });
        }
      }

      req.user = { id: decoded.id }; // Attach user ID to request
      next();
    });
  } catch (error) {
    console.error("❌ Auth Middleware Error:", error.message);
    res.status(500).json({ message: "Server error during authentication." });
  }
};

export default authMiddleware;
