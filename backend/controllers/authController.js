const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

// Signup user
const signupUser = async (req, res) => {
  const { name, email, password } = req.body

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Directly store the password without hashing
    console.log("Plain Password:", password)

    // Create a verification code
    const verificationCode = Math.floor(1000 + Math.random() * 9000).toString()

    // Create new user
    const newUser = new User({
      name,
      email,
      password, // Store plain password directly
      verificationCode,
    })

    await newUser.save()

    res.status(201).json({
      message: "User created successfully. Verification code sent.",
      verificationCode,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    console.log("Login request received for email:", email)

    // Check if the user exists
    const user = await User.findOne({ email })
    if (!user) {
      console.log("User not found")
      return res.status(400).json({ message: "Invalid credentials" })
    }

    console.log("User found, checking password")

    // Check if the password matches directly without hashing
    console.log("Entered Password:", password)
    console.log("Stored Password:", user.password)

    if (password !== user.password) {
      // Compare plain passwords
      console.log("Password mismatch")
      return res.status(400).json({ message: "Invalid credentials" })
    }

    console.log("Password matched, generating token")

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    })

    // Send response with the JWT token
    res.json({
      message: "Login successful",
      token,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

module.exports = { signupUser, loginUser }
