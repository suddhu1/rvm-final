// backend/controllers/userController.js

const User = require("../models/userModel")

// Get user dashboard data
const getDashboardData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id) // Assuming JWT token is validated and user ID is available
    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    // Return user dashboard data
    res.json({
      name: user.name,
      email: user.email,
      verificationCode: user.verificationCode,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

module.exports = { getDashboardData }
