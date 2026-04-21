const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: true,
  },
  items: [
    {
      menu_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
      },
      quantity: Number,
    },
  ],
  status: {
    type: String,
    default: 'pending',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);
