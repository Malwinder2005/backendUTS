const Menu = require('./menu-model');
const Order = require('./order-model');

const getAllMenus = async () => await Menu.find({});

const getMenuById = async (id) => await Menu.findById(id);

const createMenu = async (data) => await Menu.create(data);

const updateMenuById = async (id, data) =>
  await Menu.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

// DELETE MENU REPOSITORY
const deleteMenu = async (id) => Menu.findByIdAndDelete(id);

// CREATE ORDER
const createOrder = async (data) => {
  const order = new Order(data);
  return order.save();
};

module.exports = {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenuById,
  deleteMenu,
  createOrder,
};
