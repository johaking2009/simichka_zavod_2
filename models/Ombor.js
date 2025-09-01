const mongoose = require("mongoose");

const omborSchema = new mongoose.Schema({
  navi: { type: String, required: true, trim: true },
  ombordagi_mahsulot: { type: Number, required: true },
  kg_narxi: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.models.Ombor || mongoose.model("Ombor", omborSchema);