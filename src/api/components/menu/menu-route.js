const menuController = require('./menu-controller');

module.exports = (router) => {
  // Tambahkan '/menu' di setiap path
  router.get('/menu', menuController.getMenus);
  router.get('/menu/:id', menuController.getDetailMenu);
  router.post('/menu', menuController.createMenu);
  // CREATE ORDER
  router.post('/orders', menuController.createOrder);
  router.put('/menu/:id', menuController.updateMenu);
  // DELETE MENU
  router.delete('/menu/:id', menuController.deleteMenu);
};
