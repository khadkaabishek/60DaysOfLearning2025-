// controllers/authController.js
const User = require("./../models/user");
const bcrypt = require("bcrypt");

async function handleSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

    // ✅ Do NOT hash manually — just pass plain password
    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save(); // pre-save will hash the password

    return res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = { handleSignup };
