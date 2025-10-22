const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors"); // <-- Qo'shildi

const usersRoute = require("./routes/user");
const clientRoute = require("./routes/client");
const omborRoute = require("./routes/ombor");

dotenv.config(); // .env faylni o‘qish

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // <-- Qo'shildi

// Serve static frontend (index.html + styles) from project root
const path = require('path');
const publicDir = path.join(__dirname);
app.use(express.static(publicDir));

// MongoDB ga ulanish
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB ulandi"))
  .catch((err) => console.error("❌ MongoDB ulanishda xato:", err));

// Routerni ulash
app.use("/users", usersRoute);
// Alias so frontend can call /mahsulotlar (same as /users)
app.use("/mahsulotlar", usersRoute);
app.use("/clients", clientRoute);
app.use("/ombor", omborRoute);

// Serve index.html for root and unknown routes (so Vercel and browser can load frontend)
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Optional: fallback for other routes (single page apps)
app.get('*', (req, res) => {
  // if the request is for an API route, skip
  if (req.path.startsWith('/users') || req.path.startsWith('/clients') || req.path.startsWith('/ombor') || req.path.startsWith('/mahsulotlar')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.sendFile(path.join(publicDir, 'index.html'));
});

// Serverni ishga tushirish
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT}-portda ishga tushdi...`);
});