const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  ism: {
    type: String,
    required: true,
    trim: true
  },
  telefon: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    default: "klent"
  } // 'klent' yoki 'yetkazuvchi'
}, { timestamps: true });

module.exports = mongoose.models.Client || mongoose.model("Client", clientSchema);