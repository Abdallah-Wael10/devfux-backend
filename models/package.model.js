const mongoose = require("mongoose");
const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price_USD: { type: Number, required: true },
  price_EGP: { type: Number, required: true },
  feature1: { type: String , required: true },
  feature2: { type: String  },
  feature3: { type: String },
  feature4: { type: String },
  feature5: { type: String },
  feature6: { type: String },
  feature7: { type: String },
  feature8: { type: String },
});

module.exports = mongoose.model("Package", packageSchema);