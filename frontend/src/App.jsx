// src/App.jsx

import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom" // Use Routes instead of Switch
import Header from "./components/Header"
import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage" // Import LoginPage
import MachineLocator from "./components/MachineLocator"
import Dashboard from "./components/Dashboard"
import "leaflet/dist/leaflet.css" // Import Leaflet CSS

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        {/* Define all the routes within the Routes component */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} /> {/* Add this route */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/machine-locator" element={<MachineLocator />} />
      </Routes>
    </Router>
  )
}

export default App
