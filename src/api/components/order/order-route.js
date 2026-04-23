const orderController = require('./order-controller');

module.exports = (router) => {
  // CREATE ORDER
  router.post('/orders', orderController.createOrder);
};
