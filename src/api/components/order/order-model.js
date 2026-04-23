const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    customer_name: String,
    items: [
      {
        menu_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Menu',
        },
        quantity: Number,
        harga: Number,
        subtotal: Number,
      },
    ],
    total_harga: Number,
    status: {
      type: String,
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Order', orderSchema);
