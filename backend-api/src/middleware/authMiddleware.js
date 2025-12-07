import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

export default function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "devsecret");

    // Save user info for routes
    req.user = decoded;

    next();
  } catch (err) {
    logger.error({
      msg: "Invalid or expired token",
      error: err.message,
    });
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
