// backend/routes/userRoutes.js

const express = require("express")
const { getDashboardData } = require("../controllers/userController")
const { protect } = require("../middleware/authMiddleware")

const router = express.Router()

// GET: Fetch user dashboard data (requires authentication)
router.get("/dashboard", protect, getDashboardData)

module.exports = router
