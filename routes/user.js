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

// 🔹 GET - Bitta tranzaksiya (ID bo'yicha)
router.get('/:id', async (req, res) => {
  try {
    const tx = await ProductTransaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ error: 'Tranzaksiya topilmadi' });
    res.json(tx);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Helper: accept `navi` from frontend and map to schema field `mahsulot_nomi` (non-breaking)
function normalizeNavi(body) {
  if (!body) return body;
  if (body.navi && !body.mahsulot_nomi) {
    body.mahsulot_nomi = body.navi;
  }
  return body;
}

// 🔹 POST - Yangi mahsulot tranzaksiyasi qo‘shish
router.post("/", async (req, res) => {
  try {
    normalizeNavi(req.body);
    const newProduct = new ProductTransaction(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 PUT - Tranzaksiyani yangilash
router.put("/:id", async (req, res) => {
  try {
    normalizeNavi(req.body);
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