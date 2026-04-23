const express = require('express');

const books = require('./components/books/books-route');
const users = require('./components/users/users-route');
const menu = require('./components/menu/menu-route');
const order = require('./components/order/order-route');

module.exports = () => {
  const app = express.Router();

  books(app);
  users(app);
  menu(app);
  order(app);

  return app;
};
