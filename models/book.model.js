const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  service: { type: String, required: true},
  status: { type: String},
  time: { type: String, required: true},
  date: { type: String, required: true},
  package_Name :{ type: String, required: true},
  details : { type: String, required: true},
  

 
});

module.exports = mongoose.model("BookLead", bookSchema);