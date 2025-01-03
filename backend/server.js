// backend/server.js

const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const { connectDB } = require("./config")

const app = express()

// Middleware
app.use(cors())
app.use(express.json()) // Parse incoming JSON requests

// Connect to the database
connectDB()

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/user", userRoutes)

// Basic Route
app.get("/", (req, res) => {
  res.send("API is running")
})

// Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
