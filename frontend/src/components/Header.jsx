// // src/components/Header.jsx

// import React from "react"
// import { Link } from "react-router-dom" // Import Link for navigation
// import "../styles/global.css" // Import global styles
// import "../styles/header.css" // Import specific header styles

// const Header = () => {
//   return (
//     <header className="header">
//       <div className="logo-container">
//         <Link to="/" className="logo">
//           RVM
//         </Link>
//       </div>
//       <nav className="nav-links">
//         <Link to="/" className="nav-link">
//           Home
//         </Link>
//         <Link to="/dashboard" className="nav-link">
//           Dashboard
//         </Link>
//         <Link to="/machine-locator" className="nav-link">
//           Machine Locator
//         </Link>
//         {/* <Link to="/profile" className="nav-link">
//           Profile
//         </Link> */}
//       </nav>
//       <div className="auth-buttons">
//         <Link to="/login" className="button login-button">
//           Login
//         </Link>
//         <Link to="/signup" className="button signup-button">
//           Signup
//         </Link>
//       </div>
//     </header>
//   )
// }

// export default Header
// src/components/Header.jsx
// src/components/Header.jsx

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/global.css";
import "../styles/header.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check user authentication state from localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(user);
    if (user) {
      setIsLoggedIn(true);
    }
  }, [location]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };
  console.log(isLoggedIn);
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
        <Link to="/machine-locator" className="nav-link">
          Machine Locator
        </Link>
        {isLoggedIn && (
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        )}
      </nav>

      <div className="auth-buttons">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="button login-button">
              Login
            </Link>
            <Link to="/signup" className="button signup-button">
              Signup
            </Link>
          </>
        ) : (
          <button onClick={handleLogout} className="button logout-button">
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
