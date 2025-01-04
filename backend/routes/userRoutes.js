// backend/routes/userRoutes.js

const express = require("express")
const { getDashboardData } = require("../controllers/userController")
const { protect } = require("../middleware/authMiddleware")
const userRoutes = require("./routes/userRoutes")
const router = express.Router()

app.use("/api/user", userRoutes)

// GET: Fetch user dashboard data (requires authentication)
router.get("/dashboard", protect, getDashboardData)

module.exports = router
