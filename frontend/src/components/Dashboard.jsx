// src/components/Dashboard.js

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { logoutUser } from "../services/authService" // Import logout service
import fetchDashboardData from "../services/userService" // Import dashboard data fetch service
import { withdrawPoints } from "../services/userService"; // Import withdrawPoints service
import "../styles/global.css" // Import global styles
import "../styles/ecoStyle.css" // Import eco-friendly specific styles
import "../styles/animations.css" // Import animations
import "../styles/dashboard.css" // Import dashboard specific styles
import "../components/Vouchers"
import Vouchers from "../components/Vouchers";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);

  const navigate = useNavigate();

  // Fetch user data when the page loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await fetchDashboardData(); // Call the service to get user data
        setUserData(data);
      } catch (error) {
        setErrorMessage("Failed to load user data. Please try again.");
      }
    };
    fetchUserData();
  }, []);

  // Handle user logout
  const handleLogout = () => {
    logoutUser(); // Call the logout service
    navigate("/login"); // Redirect user to login page
  };
  // Handle withdrawal
 const handleWithdraw = async () => {
   // Convert points to money: 10 points = ₹5, so 1 point = ₹0.5
   const moneyToWithdraw = (withdrawalAmount * 5) / 10; // Conversion: 10 points = ₹5

   if (userData?.points < withdrawalAmount) {
     setErrorMessage("Insufficient points for withdrawal.");
     return;
   }

   try {
     const response = await withdrawPoints(withdrawalAmount); // Pass points to the API
     setUserData((prevData) => ({
       ...prevData,
       points: response.updatedPoints,
       totalMoneyWithdrawn: response.totalMoneyWithdrawn,
     }));
     setWithdrawalAmount(0); // Reset input
     alert(`₹${moneyToWithdraw} withdrawn successfully!`);
   } catch (error) {
     alert("Failed to withdraw points. " + error.message);
   }
 };

 return (
   <div className="dashboard-container fade-in">
     <h1 className="eco-heading">Welcome to Your Dashboard</h1>

     {errorMessage && <p className="error-message">{errorMessage}</p>}

     {userData ? (
       <>
         {/* User Info Section */}
         <div className="user-info slide-in">
           <p>
             <strong>Name:</strong> {userData?.name || "Not available"}
           </p>
           <p>
             <strong>Email:</strong> {userData?.email || "Not available"}
           </p>
           <p>
             <strong>Verification Code:</strong>{" "}
             {userData?.verificationCode || "Not available"}
           </p>
           <p>
             <strong>Total Bottles Deposited:</strong>{" "}
             {userData?.bottlesDeposited || 0}
           </p>
           <p>
             <strong>Total Cans Deposited:</strong>{" "}
             {userData?.cansDeposited || 0}
           </p>
           <p>
             <strong>Total Points:</strong> {userData?.points || 0}
           </p>
           <p>
             <strong>Total Money Withdrawn:</strong> Rs
             {userData?.totalMoneyWithdrawn || 0}
           </p>
         </div>

         {/* Withdrawal Section */}
         {/* <div className="withdrawal-section slide-in">
           <h2>Withdraw Points</h2>
           <p>Earn ₹5 for every 10 points.</p>
           <input
             type="number"
             value={withdrawalAmount}
             onChange={(e) => setWithdrawalAmount(Number(e.target.value))}
             placeholder="Enter points to withdraw"
             className="withdraw-input"
           />
           <button onClick={handleWithdraw} className="withdraw-btn">
             Withdraw
           </button>
         </div> */}
         <Vouchers></Vouchers>
         
       </>
     ) : (
       <p>Loading user data...</p>
     )}
   </div>
 );

}

export default Dashboard
