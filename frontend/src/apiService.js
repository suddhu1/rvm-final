// src/apiService.js
import axios from "axios"

const BASE_URL = "http://localhost:5000/api" // Update this to your backend URL

// Signup API
export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/signup`, userData)
    return response.data
  } catch (error) {
    console.error("Error during signup:", error.response?.data || error.message)
    throw error.response?.data || error.message
  }
}

// Login API
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, userData)
    return response.data
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message)
    throw error.response?.data || error.message
  }
}

// Fetch User Data (Optional, if needed)
export const fetchUserData = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}/auth/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    console.error(
      "Error fetching user data:",
      error.response?.data || error.message
    )
    throw error.response?.data || error.message
  }
}
