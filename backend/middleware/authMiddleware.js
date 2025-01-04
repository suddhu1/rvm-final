// backend/middleware/authMiddleware.js

const jwt = require("jsonwebtoken")

const protect = (req, res, next) => {
  let token

  // Check if token is in the request headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1] // Extract token from 'Bearer <token>'

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      if (!decoded) {
        throw new Error("Token verification failed")
      }
      // Attach user ID to the request object
      req.user = decoded
      next() // Proceed to the next middleware or route handler
    } catch (error) {
      console.error(error)
      res.status(401).json({ message: "Not authorized" })
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" })
  }
}

module.exports = { protect }
