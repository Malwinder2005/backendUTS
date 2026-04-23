const menuRepository = require('./menu-repository');

const getMenuList = async () => await menuRepository.getAllMenus();

const getMenuById = async (id) => await menuRepository.getMenuById(id);

const createMenu = async (data) => {
  if (!data.nama || data.harga == null) {
    const err = new Error('Nama dan harga wajib diisi');
    err.status = 400;
    err.code = 'BAD_REQUEST';
    throw err;
  }
  return menuRepository.createMenu(data);
};

const updateMenu = async (id, data) => {
  const result = await menuRepository.updateMenuById(id, data);
  if (!result) {
    const err = new Error('Menu tidak ditemukan');
    err.status = 404;
    err.code = 'NOT_FOUND';
    throw err;
  }
  return result;
};

// DELETE MENU SERVICE
const deleteMenu = async (id) => {
  const menu = await menuRepository.deleteMenu(id);
  if (!menu) {
    throw errorResponder('Menu not found');
  }
  return menu;
};

module.exports = {
  getMenuList,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
};
