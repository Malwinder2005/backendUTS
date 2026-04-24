const { errorResponder, errorTypes } = require('../../../core/errors');
const orderService = require('./order-service');

/// CREATE ORDER
const createOrder = async (req, res, next) => {
  try {
    const orderData = req.body;

    // Validasi sederhana
    if (!orderData.customer_name || !orderData.items) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'customer_name dan items wajib diisi'
      );
    }

    const result = await orderService.createOrder(orderData);

    return res.status(201).json({
      // 🔥 seharusnya 201 (created)
      status: 'success',
      message: 'Order created successfully',
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};
const getOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getOrders();
    return res.status(200).json(orders);
  } catch (error) {
    return next(error);
  }
};
const getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    return res.status(200).json(order);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
};
