// src/components/Header.jsx

import React from "react"
import { Link } from "react-router-dom" // Import Link for navigation
import "../styles/global.css" // Import global styles
import "../styles/header.css" // Import specific header styles

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/" className="logo">
          RVM
        </Link>
      </div>
      <nav className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
        <Link to="/machine-locator" className="nav-link">
          Machine Locator
        </Link>
        {/* <Link to="/profile" className="nav-link">
          Profile
        </Link> */}
      </nav>
      <div className="auth-buttons">
        <Link to="/login" className="button login-button">
          Login
        </Link>
        <Link to="/signup" className="button signup-button">
          Signup
        </Link>
      </div>
    </header>
  )
}

export default Header
