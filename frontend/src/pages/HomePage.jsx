// src/pages/HomePage.jsx

import React from "react"
import "../styles/global.css" // Import global styles
import "../styles/homePage.css" // Import HomePage-specific styles

const HomePage = () => {
  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <section className="hero-section fade-in">
        <h1 className="hero-title">Welcome to the Reverse Vending Machine</h1>
        <p className="hero-subtitle">
          Join the revolution for a greener future. Recycle, earn rewards, and
          make a difference!
        </p>
        <button className="cta-button">Get Started</button>
      </section>

      {/* Features Section */}
      <section className="features-section slide-in">
        <h2 className="features-heading">Why Use Our RVM?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/889/889442.png"
              alt="Recycle"
              className="feature-icon"
            />
            <h3 className="feature-title">Eco-Friendly</h3>
            <p className="feature-description">
              Contribute to the environment by recycling plastic bottles and
              cans efficiently.
            </p>
          </div>
          <div className="feature-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2166/2166823.png"
              alt="Rewards"
              className="feature-icon"
            />
            <h3 className="feature-title">Earn Rewards</h3>
            <p className="feature-description">
              Earn points for every item recycled and redeem them for exciting
              rewards.
            </p>
          </div>
          <div className="feature-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/679/679724.png"
              alt="Locate"
              className="feature-icon"
            />
            <h3 className="feature-title">Locate Machines</h3>
            <p className="feature-description">
              Easily find the nearest Reverse Vending Machine using our locator.
            </p>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer fade-in">
        <p>&copy; 2025 Reverse Vending Machine. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export default HomePage
