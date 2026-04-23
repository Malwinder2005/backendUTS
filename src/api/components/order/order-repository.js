const Order = require('./order-model');

// CREATE ORDER
const createOrder = async (data) => {
  const order = new Order(data);
  return order.save();
};

module.exports = {
  createOrder,
};
