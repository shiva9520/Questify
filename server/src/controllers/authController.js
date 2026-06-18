import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "fallback_secret_key_123", {
    expiresIn: "30d"
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export async function register(req, res, next) {
  try {
    const { username, password, confirmPassword } = req.body;

    if (!username || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const user = await User.create({
      username,
      password
    });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id)
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      error.statusCode = 400;
    }
    next(error);
  }
}

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export async function login(req, res, next) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Please provide both username and password" });
    }

    const user = await User.findOne({ username });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id)
      });
    } else {
      return res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    next(error);
  }
}
