import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
connectDB();
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

// MIDDLEWARES
const corsOptions = {
  origin: "http://localhost:5173", // frontend URL
  credentials: true,               // allow cookies / auth headers
};
app.use(cors(corsOptions));
app.use(express.json()); // ✅ Important for req.body in POST

// ROUTES
app.use("/api/auth", authRoutes);

// START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


