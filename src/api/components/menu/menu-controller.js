const { errorResponder, errorTypes } = require('../../../core/errors');
const menuService = require('./menu-service');

const getMenus = async (req, res, next) => {
  try {
    const menus = await menuService.getMenuList();
    return res.status(200).json(menus);
  } catch (error) {
    return next(error);
  }
};

const getDetailMenu = async (req, res, next) => {
  try {
    const menu = await menuService.getMenuById(req.params.id);
    if (!menu) return res.status(404).json({ message: 'Menu not found' });
    return res.status(200).json(menu);
  } catch (error) {
    return next(error);
  }
};

// 🔽 No 3: Tambah Menu (POST /api/menu)
const createMenu = async (req, res, next) => {
  try {
    const newMenu = await menuService.createMenu(req.body);
    return res
      .status(201)
      .json({ message: 'Menu berhasil ditambahkan', data: newMenu });
  } catch (error) {
    return next(error);
  }
};

// 🔽 No 4: Update Menu (PUT /api/menu/:id)
const updateMenu = async (req, res, next) => {
  try {
    const updatedMenu = await menuService.updateMenu(req.params.id, req.body);
    return res
      .status(200)
      .json({ message: 'Menu berhasil diupdate', data: updatedMenu });
  } catch (error) {
    return next(error);
  }
};

// DELETE MENU
const deleteMenu = async (req, res, next) => {
  try {
    const Delete = await menuService.deleteMenu(req.params.id);

    if (!Delete) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete user'
      );
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getMenus,
  getDetailMenu,
  createMenu,
  updateMenu,
  deleteMenu,
};
