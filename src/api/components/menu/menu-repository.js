const Menu = require('./menu-model');

const getAllMenus = async () => await Menu.find({});

const getMenuById = async (id) => await Menu.findById(id);

const createMenu = async (data) => await Menu.create(data);

const updateMenuById = async (id, data) =>
  await Menu.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

module.exports = {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenuById,
};
