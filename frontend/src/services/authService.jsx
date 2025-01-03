// src/services/authService.jsx
import axios from "axios"

// Function to log in the user
export const loginUser = async ({ email, password }) => {
  try {
    // Send login request to backend API
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
    })

    // If login is successful, return user data
    return response.data
  } catch (error) {
    // Handle any errors (invalid credentials, server issues, etc.)
    throw new Error("Login failed. Please check your credentials.")
  }
}

// Function to register a new user
export const signupUser = async ({ name, email, password }) => {
  try {
    // Send registration request to backend API
    const response = await axios.post(
      "http://localhost:5000/api/auth/signup", // Use the correct endpoint
      { name, email, password }
    )

    // If registration is successful, return user data
    return response.data
  } catch (error) {
    // Handle any errors (e.g., email already taken, server issues, etc.)
    throw new Error(
      error.response?.data?.message || "Registration failed. Please try again."
    )
  }
}

export const getUserData = async () => {
  try {
    // Send GET request to fetch user data (token must be in localStorage or sessionStorage)
    const token = localStorage.getItem("token")
    if (!token) throw new Error("No token found. Please log in.")

    const response = await axios.get("http://localhost:5000/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    })

    // Return user data
    return response.data
  } catch (error) {
    throw new Error("Failed to fetch user data.")
  }
}

// Function to log out the user
export const logoutUser = () => {
  // Remove the token from localStorage or sessionStorage
  localStorage.removeItem("token")
}
