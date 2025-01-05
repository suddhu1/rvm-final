// backend/routes/authRoutes.js

const express = require("express")
const { signupUser, loginUser } = require("../controllers/authController")
const User = require("../models/userModel");
const router = express.Router()
const jwt = require("jsonwebtoken");
require("dotenv").config();
// POST: Register a new user
router.post("/signup", signupUser)

// POST: Login an existing user
router.post("/login", loginUser)
router.post("/verify-code", async (req, res) => {
  const { verificationCode } = req.body;
  try {
    const user = await User.findOne({ verificationCode });
    if (!user) {
      return res.status(400).json({ message: "Invalid verification code." });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.json({ token, userId: user._id });
    console.log("Received verification code:", req.body.verificationCode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/api/auth/verify-code", async (req, res) => {
  const { verificationCode } = req.body;
  try {
    const user = await User.findOne({ verificationCode });
    if (!user) {
      return res.status(400).json({ message: "Invalid verification code." });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.json({ token, userId: user._id });
    console.log("Received verification code2:", req.body.verificationCode);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router
