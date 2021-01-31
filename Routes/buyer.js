const express = require('express');
const buyerController = require('../Controllers/buyerController');
const Router = express.Router();
const isAuth =require('../Util/isAuth');

Router.get('/', isAuth,buyerController.getIndex);

Router.get('/details/:id',buyerController.getDetails);

Router.post('/addToCart',buyerController.addToCart);
Router.get('/cart',buyerController.getCart);

Router.get('/orders',buyerController.getOrders);

module.exports = Router;