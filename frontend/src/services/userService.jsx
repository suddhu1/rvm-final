// src/services/userService.js

import axios from "axios"

const fetchDashboardData = async () => {
  try {
    const token = localStorage.getItem("token") // Retrieve token from localStorage
    const response = await axios.get(
      "http://localhost:5000/api/user/dashboard",
      {
        headers: {
          Authorization: `Bearer ${token}`, // Send token for authentication
        },
      }
    )
    console.log("User data:", response.data)
    return response.data
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error)
    throw error
  }
}

// Withdraw points service
export const withdrawPoints = async (pointsToWithdraw) => {
  try {
    const token = localStorage.getItem("token");
    console.log("Sending withdrawal request:", pointsToWithdraw); // Log request data
    const response = await axios.post(
      "http://localhost:5000/api/user/withdraw",
      { pointsToWithdraw },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to withdraw points:", error);
    throw error.response?.data || error.message;
  }
};

export default fetchDashboardData
