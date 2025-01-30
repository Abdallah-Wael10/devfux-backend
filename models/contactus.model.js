const mongoose = require("mongoose");
const contactusSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  service: { type: String, required: true},
  status: { type: String},
  details : { type: String, required: true},
  

 
});

module.exports = mongoose.model("ContactUS", contactusSchema);