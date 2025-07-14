import express from "express";
import { signup, login } from "../controllers/authController.js";
import User from "../models/User.js"; // import User model to use in /check-user

const router = express.Router();

// POST /signup
router.post("/signup", signup);

// POST /login
router.post("/login", login);

// ✅ NEW: POST /check-user
router.post("/check-user", async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    const user = await User.findOne({ phone });

    if (user) {
      res.json({ exists: true });
    } else {
      res.json({ exists: false });
    }
  } catch (err) {
    console.error("Check user error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;

