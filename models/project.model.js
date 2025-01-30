const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: { type: String, required: true },
  mainImage: { type: String, required: true },
  extraImages: [{ type: String }], // Array of strings to store image file paths
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
 