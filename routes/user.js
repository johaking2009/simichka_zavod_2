const express = require("express");
const ProductTransaction = require("../models/user");

const router = express.Router();

// 🔹 GET - Barcha mahsulot tranzaksiyalari
router.get("/", async (req, res) => {
  try {
    const transactions = await ProductTransaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 POST - Yangi mahsulot tranzaksiyasi qo‘shish
router.post("/", async (req, res) => {
  try {
    const newProduct = new ProductTransaction(req.body);
    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 PUT - Tranzaksiyani yangilash
router.put("/:id", async (req, res) => {
  try {
    const updated = await ProductTransaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 DELETE - Tranzaksiyani o‘chirish
router.delete("/:id", async (req, res) => {
  try {
    await ProductTransaction.findByIdAndDelete(req.params.id);
    res.json({ message: "🗑️ Tranzaksiya o‘chirildi" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;