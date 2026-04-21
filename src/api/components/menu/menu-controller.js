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

module.exports = { getMenus, getDetailMenu };