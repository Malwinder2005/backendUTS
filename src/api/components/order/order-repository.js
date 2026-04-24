const Order = require('./order-model');

// CREATE ORDER
const createOrder = async (data) => {
  const order = new Order(data);
  return order.save();
};
const getOrders = async () => Order.find({});

const getOrderById = async (id) => Order.findById(id);

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
};
