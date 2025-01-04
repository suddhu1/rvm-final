// src/pages/SignupPage.js
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signupUser } from "../services/authService"
import "../styles/global.css"
import "../styles/signup.css"

const SignupPage = () => {
  const [name, setName] = useState("") // Add state for the user's name
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    try {
      // Pass name, email, and password to the signup service
      await signupUser({ name, email, password })
      navigate("/login") // Redirect to the login page after successful signup
    } catch (error) {
      setErrorMessage("Signup failed. Please try again.")
    }
  }

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // Bind name input
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit" className="signup-btn">
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default SignupPage
