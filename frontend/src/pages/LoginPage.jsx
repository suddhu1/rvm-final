// src/pages/LoginPage.js

import React, { useState } from "react"
import { useNavigate } from "react-router-dom" // Replace useHistory with useNavigate
import { loginUser } from "../services/authService" // Import login service
import "../styles/global.css" // Global styles
import "../styles/login.css" // Local styles

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate() // Replace useHistory with useNavigate

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const cleanedEmail = email.trim()
      const cleanedPassword = password.trim()
      await loginUser({ email: cleanedEmail, password: cleanedPassword })
      navigate("/dashboard")
    } catch (error) {
      setErrorMessage("Invalid credentials. Please try again.")
    }
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
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
        <button type="submit" className="login-btn">
          Login
        </button>
      </form>
    </div>
  )
}

export default LoginPage
