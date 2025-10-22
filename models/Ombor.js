const mongoose = require("mongoose");

const omborSchema = new mongoose.Schema({
  navi: { type: String, required: true, trim: true },
  ombordagi_mahsulot: { type: Number, required: true },
  kg_narxi: { type: Number, required: true }
  ,
  // Hisoblangan foyda: dollar va so'm ko'rinishida saqlash uchun maydonlar
  profit_dollar: { type: Number, default: 0 },
  profit_sum: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.models.Ombor || mongoose.model("Ombor", omborSchema);