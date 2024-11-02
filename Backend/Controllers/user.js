import User from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = "MEDICO";

// Sign-up controller
export const signup = async (req, res, next) => {
  try {
    const { username, phone, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format!",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long !!",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exist with this email!!" });
    }
    const user = new User({
      username: username,
      email: email,
      password: hashedPassword,
      role: role,
      phone: phone,
    });
    await user.save();
    res.status(201).json({
      success: true,
      message: `User registered successfully`,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ success: false, errors });
    }
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User does not exist!!" });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "30d",
    });

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      success: true,
      message: "Logged in successfully!! ",
      token: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// Logout controller
export const logout = async (req, res) => {
  res.status(200).json({ success: true, message: "Logged out successfully" });
};


// add new admin
export const addNewAdmin = async (req, res, next) => {
  try {
    const { username, email, phone, password } = req.body;

    // Check if all fields are provided
    if (!username || !email || !phone || !password) {
      return next({
        message: "Please fill out the entire form.",
        statusCode: 400,
      });
    }

    // Validate if the email format is correct
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
      return next({
        message: "Please provide a valid email address.",
        statusCode: 400,
      });
    }

    // Check if the phone number is valid (e.g., 10 digits)
    if (!/^\d{10}$/.test(phone)) {
      return next({
        message: "Please provide a valid 10-digit phone number.",
        statusCode: 400,
      });
    }

    // Check if admin with the same email already exists
    const isRegistered = await User.findOne({ email });
    if (isRegistered) {
      return next({
        message: "Admin with this email already exists!",
        statusCode: 400,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword =  await bcrypt.hash(password, salt)
    // Create the new admin
    const admin = await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
      role: "admin",
    });

    // Send success response
    res.status(201).json({
      success: true,
      message: "New admin registered successfully.",
      admin,
    });
  } catch (error) {
    // Handle any unexpected errors
    next({
      message: error.message || "Failed to register admin.",
      statusCode: 500,
    });
  }
};


export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User does not exist!!" });
    }
    const role = user.role;
    if (role!== "admin") {
      return res.status(403).json({ message: "You are not the Admin!!" });
    }

    const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: "30d",
    });

   
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({
      success: true,
      message: "Logged in successfully!! ",
      token: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

