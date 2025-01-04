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

export default fetchDashboardData
