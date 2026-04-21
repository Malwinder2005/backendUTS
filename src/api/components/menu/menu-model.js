const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  harga: { type: Number, required: true },
  deskripsi: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Menu', menuSchema);
