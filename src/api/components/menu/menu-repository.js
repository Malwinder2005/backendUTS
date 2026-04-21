const Menu = require('./menu-model');

const getAllMenus = async () => {
  return await Menu.find({});
};

const getMenuById = async (id) => {
  return await Menu.findById(id);
};

module.exports = { getAllMenus, getMenuById };