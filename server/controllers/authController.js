import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Enhanced Signup Controller
export const signup = async (req, res) => {
  try {
    console.log("\n📝 Signup request received:", req.body);
    
    // Destructure and trim all inputs
    let { name, phone, email, dob, password } = req.body;
    name = name?.trim();
    phone = phone?.trim();
    email = email?.trim();
    
    // Validation
    if (!name || !phone || !email || !dob || !password) {
      console.log("❌ Missing fields:", { name, phone, email, dob, password: !!password });
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check existing user
    const existing = await User.findOne({ phone });
    console.log("🔍 Existing user check:", existing ? "Exists" : "New");
    if (existing) return res.status(409).json({ msg: "User already exists" });

    // Password hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔑 Password hashed");

    // Create user
    const user = await User.create({
      name, phone, email, dob,
      password: hashedPassword
    });
    console.log("✅ User created:", { id: user._id, name: user.name });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    console.log("✨ JWT generated");

    // Successful response
    res.status(201).json({
      token, // As root-level field
      name: user.name,
      email: user.email // Additional useful fields
    });

  } catch (err) {
    console.error("🔥 Signup error:", err);
    res.status(500).json({ 
      msg: "Signup failed",
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

export const login = async (req, res) => {
  try {
    console.log('\n🔑 Login attempt:', {
      phone: req.body.phone,
      ip: req.ip,
      timestamp: new Date().toISOString()
    });

    // Validate input
    const { phone, password } = req.body;
    if (!phone?.trim() || !password) {
      return res.status(400).json({ 
        success: false,
        msg: "Phone and password are required" 
      });
    }

    // Find user with case-insensitive phone number search
    const user = await User.findOne({ 
      phone: { $regex: new RegExp(`^${phone.trim()}$`, 'i') } 
    });
    
    if (!user) {
      console.log('❌ User not found for phone:', phone);
      return res.status(401).json({ 
        success: false,
        msg: "Invalid credentials" 
      });
    }

    // Password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('🔐 Password mismatch for user:', user._id);
      return res.status(401).json({ 
        success: false,
        msg: "Invalid credentials" 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '7d' }
    );

    console.log('✅ Successful login for user:', user.name);

    // Set secure http-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    // Send response
    res.status(200).json({
      success: true,
      token,
      name: user.name,
      email: user.email
    });

  } catch (err) {
    console.error('🔥 Login error:', {
      error: err.message,
      stack: err.stack,
      body: req.body
    });

    res.status(500).json({ 
      success: false,
      msg: "Login failed",
      ...(process.env.NODE_ENV === 'development' && {
        error: err.message,
      })
    });
  }
};



