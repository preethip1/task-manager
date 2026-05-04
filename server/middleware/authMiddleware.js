const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if header exists
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Format: Bearer TOKEN
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, "secret");

    // Attach user info to request
    req.user = decoded; // { id: userId }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};