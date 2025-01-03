// src/components/Dashboard.js

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUserData, logoutUser } from "../services/authService" // Import services
import "../styles/global.css" // Import global styles
import "../styles/ecoStyle.css" // Import eco-friendly specific styles
import "../styles/animations.css" // Import animations

const Dashboard = () => {
  const [userData, setUserData] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate() // Replaces useHistory

  // Fetch user data when the page loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData() // Call the service to get user data
        setUserData(data)
      } catch (error) {
        setErrorMessage("Failed to load user data. Please try again.")
      }
    }
    fetchUserData()
  }, [])

  // Handle user logout
  const handleLogout = () => {
    logoutUser() // Call the logout service
    navigate("/login") // Redirect user to login page
  }

  return (
    <div className="dashboard-container fade-in">
      <h1 className="eco-heading">Welcome to Your Dashboard</h1>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {userData ? (
        <>
          <div className="user-info slide-in">
            <p>
              <strong>Email:</strong> {userData?.email || "Not available"}
            </p>
            <p>
              <strong>Total Bottles Deposited:</strong>{" "}
              {userData?.totalBottles || 0}
            </p>
            <p>
              <strong>Last Deposit Location:</strong>{" "}
              {userData?.lastDepositLocation || "Not available"}
            </p>
          </div>

          <div className="deposit-history slide-in">
            <h2>Recent Deposits</h2>
            <ul>
              {userData?.recentDeposits?.length > 0 ? (
                userData.recentDeposits.map((deposit, index) => (
                  <li key={index}>
                    <p>
                      <strong>Machine Location:</strong>{" "}
                      {deposit.machineLocation}
                    </p>
                    <p>
                      <strong>Date:</strong> {deposit.date}
                    </p>
                  </li>
                ))
              ) : (
                <p>No recent deposits.</p>
              )}
            </ul>
          </div>

          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  )
}

export default Dashboard
