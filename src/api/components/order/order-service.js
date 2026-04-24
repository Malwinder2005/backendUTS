const orderRepository = require('./order-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');
const Menu = require('../menu/menu-model');

// CREATE ORDER
const createOrder = async (orderData) => {
  const { customer_name, items } = orderData;

  // basic validation
  if (!customer_name || !items || items.length === 0) {
    throw errorResponder(
      errorTypes.VALIDATION_ERROR,
      'customer_name dan items wajib diisi'
    );
  }

  let totalHarga = 0;
  const validatedItems = [];

  //  Loop every item
  for (const item of items) {
    const { menu_id, quantity } = item;

    //  quantity validation
    if (!quantity || quantity <= 0) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'Quantity harus lebih dari 0'
      );
    }

    // 🔍 Cari menu di database
    const menu = await Menu.findById(menu_id);

    if (!menu) {
      throw errorResponder(
        errorTypes.NOT_FOUND,
        `Menu dengan id ${menu_id} tidak ditemukan`
      );
    }

    // Count subtotal
    const subtotal = menu.harga * quantity;

    totalHarga += subtotal;

    // Save valid item
    validatedItems.push({
      menu_id,
      quantity,
      harga: menu.harga, // simpan harga saat ini
      subtotal,
    });
  }

  //  Data order final
  const newOrder = {
    customer_name,
    items: validatedItems,
    total_harga: totalHarga,
    status: 'pending',
  };

  // save into database
  return orderRepository.createOrder(newOrder);
};
const getOrders = () => orderRepository.getOrders();
const getOrderById = (id) => orderRepository.getOrderById(id);

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
};
