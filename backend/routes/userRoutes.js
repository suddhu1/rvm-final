// backend/routes/userRoutes.js

const express = require("express");
const {
  getDashboardData,
  updateDeposits,
  withdrawPointsFromUser,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// GET: Fetch user dashboard data (requires authentication)
router.get("/dashboard", protect, getDashboardData);
router.post("/update-deposits", updateDeposits);
router.post("/withdraw", protect, withdrawPointsFromUser);


module.exports = router;
