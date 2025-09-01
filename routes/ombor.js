const express = require("express");
const router = express.Router();
const Ombor = require("../models/Ombor");

// Ombordagi mahsulotlarni olish (GET)
router.get("/", async (req, res) => {
  try {
    const mahsulotlar = await Ombor.find();
    res.json(mahsulotlar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ombordagi mahsulotni bitta ID bo‘yicha olish (GET)
router.get("/:id", async (req, res) => {
  try {
    const mahsulot = await Ombor.findById(req.params.id);
    if (!mahsulot) return res.status(404).json({ error: "Mahsulot topilmadi" });
    res.json(mahsulot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Omborga mahsulot qo‘shish (POST)
router.post("/", async (req, res) => {
  try {
    const yangiMahsulot = new Ombor(req.body);
    await yangiMahsulot.save();
    res.json(yangiMahsulot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ombordagi mahsulotni o‘zgartirish (PUT)
router.put("/:id", async (req, res) => {
  try {
    const updated = await Ombor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Mahsulot topilmadi" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ombordagi mahsulotni o‘chirish (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    await Ombor.findByIdAndDelete(req.params.id);
    res.json({ message: "Ombor mahsuloti o‘chirildi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;