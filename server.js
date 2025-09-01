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

// MongoDB ga ulanish
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB ulandi"))
  .catch((err) => console.error("❌ MongoDB ulanishda xato:", err));

// Routerni ulash
app.use("/users", usersRoute);
app.use("/clients", clientRoute);
app.use("/ombor", omborRoute);

// Serverni ishga tushirish
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT}-portda ishga tushdi...`);
});