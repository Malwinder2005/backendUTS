const menuRepository = require('./menu-repository');

const getMenuList = async () => {
  return await menuRepository.getAllMenus();
};

const getMenuById = async (id) => {
  return await menuRepository.getMenuById(id);
};

module.exports = { getMenuList, getMenuById };