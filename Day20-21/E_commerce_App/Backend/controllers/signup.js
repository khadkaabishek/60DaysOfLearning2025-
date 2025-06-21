// controllers/authController.js
const User = require("./../models/user");
const bcrypt = require("bcrypt");

async function handleSignup(req, res) {
  try {
    const { name, email, password } = req.body;
    console.log("name : ", name);
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: "Signup successful!" });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = { handleSignup };
