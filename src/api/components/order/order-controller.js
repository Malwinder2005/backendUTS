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

module.exports = {
  createOrder,
};
