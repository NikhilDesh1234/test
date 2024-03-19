const express = require('express');
const routes = express.Router();
const controller = require('../Controller/Controller')

//Routes for category
routes.get('/category', controller.getCategories);
routes.post('/category', controller.addCategory);
routes.delete('/category', controller.deleteCategory);
routes.put('/category', controller.updateCategory);

//Routes for products
routes.get('/product', controller.getProducts);
routes.post('/product', controller.addProduct);
routes.delete('/product', controller.deleteProduct);
routes.put('/product', controller.updateProduct);

module.exports = routes;
