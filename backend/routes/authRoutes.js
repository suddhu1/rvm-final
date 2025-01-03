// backend/routes/authRoutes.js

const express = require("express")
const { signupUser, loginUser } = require("../controllers/authController")

const router = express.Router()

// POST: Register a new user
router.post("/signup", signupUser)

// POST: Login an existing user
router.post("/login", loginUser)

module.exports = router
