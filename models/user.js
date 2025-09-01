const mongoose = require("mongoose");

const productTransactionSchema = new mongoose.Schema({
  sana: {
    type: Date,   // Date qilib o'zgartirdim
    required: true
  },
  mahsulot_nomi: {
    type: String,
    required: true,
    trim: true
  },
  kg: {
    type: Number,
    required: true,
    default: 0
  },
  narx_sum: {
    type: Number,
    default: 0
  },
  narx_dollar: {
    type: Number,
    default: 0
  },
  jami_pul_sum: {
    type: Number,
    default: 0
  },
  jami_summa_dollar: {
    type: Number,
    default: 0
  },
  olingan_pul_sum: {
    type: Number,
    default: 0
  },
  olingan_pul_dollar: {
    type: Number,
    default: 0
  },
  kamomad_pul: {
    type: Number,
    default: 0
  },
  ortiqcha_pul: {
    type: Number,
    default: 0
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.models.ProductTransaction || mongoose.model("ProductTransaction", productTransactionSchema);
