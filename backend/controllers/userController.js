// backend/controllers/userController.js

const User = require("../models/userModel")

// Get user dashboard data
const getDashboardData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Assuming JWT token is validated and user ID is available
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return user dashboard data
    res.json({
      name: user.name,
      email: user.email,
      verificationCode: user.verificationCode,
      bottlesDeposited: user.bottlesDeposited,
      cansDeposited: user.cansDeposited,
      points: user.points,
      totalMoneyWithdrawn: user.totalMoneyWithdrawn,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// Update deposit information
const updateDeposits = async (req, res) => {
  const { userId, bottles, cans } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.bottlesDeposited += bottles;
    user.cansDeposited += cans;
    user.points += bottles * 2 + cans * 4;

    await user.save();

    res.status(200).json({
      message: 'Deposit updated successfully',
      bottlesDeposited: user.bottlesDeposited,
      cansDeposited: user.cansDeposited,
      points: user.points,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Withdraw points
// Withdraw points
// Controller to handle withdrawal requests
const withdrawPointsFromUser = async (req, res) => {
  const { pointsToWithdraw } = req.body;

  if (!pointsToWithdraw || pointsToWithdraw <= 0) {
    return res.status(400).json({ message: "Invalid points to withdraw." });
  }

  try {
    // Find the authenticated user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if user has enough points
    if (user.points < pointsToWithdraw) {
      return res
        .status(400)
        .json({ message: "Insufficient points for withdrawal." });
    }

    // Convert points to money: 10 points = ₹5
    const moneyToWithdraw = (pointsToWithdraw * 5) / 10;

    // Update user points and total money withdrawn
    user.points -= pointsToWithdraw;
    user.totalMoneyWithdrawn += moneyToWithdraw;

    await user.save();

    res.status(200).json({
      updatedPoints: user.points,
      totalMoneyWithdrawn: user.totalMoneyWithdrawn,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};



module.exports = {
  getDashboardData,
  updateDeposits,
  withdrawPointsFromUser,
};
