const express = require('express');
const route = express.Router();
const menuController = require('./menu-controller');

route.get('/', menuController.getMenus);
route.get('/:id', menuController.getDetailMenu);

module.exports = route;