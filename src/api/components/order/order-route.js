const orderController = require('./order-controller');

module.exports = (router) => {
  // CREATE ORDER
  router.get('/orders', orderController.getOrders);
  router.get('/orders/:id', orderController.getOrderById);
  router.post('/orders', orderController.createOrder);
};
