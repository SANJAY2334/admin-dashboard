import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: Token missing or invalid format." });
    }

    if (!process.env.JWT_SECRET) {
      console.error("❌ Error: Missing JWT_SECRET in environment variables.");
      return res.status(500).json({ message: "Server error: JWT secret not configured." });
    }

    const token = authHeader.replace("Bearer ", "").trim(); // More efficient extraction

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(403).json({ message: "Forbidden: Invalid token structure." });
    }

    req.user = { id: decoded.id }; // Attach user ID to request
    next();
  } catch (error) {
    console.error("❌ JWT Verification Error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Session expired. Please log in again." });
    } else {
      return res.status(403).json({ message: "Forbidden: Invalid token." });
    }
  }
};

export default verifyToken;
