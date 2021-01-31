const express = require('express');
const buyerController = require('../Controllers/buyerController');
const Router = express.Router();
const isAuth =require('../Util/isAuth');

Router.get('/', isAuth,buyerController.getIndex);

Router.get('/details/:id',isAuth, buyerController.getDetails);

Router.post('/addToCart',isAuth, buyerController.addToCart);
Router.get('/cart',isAuth, buyerController.getCart);
Router.post('/deleteCartItem',isAuth, buyerController.deleteCartItem);

Router.get('/checkout',isAuth, buyerController.postOrder)
Router.get('/orders',isAuth, buyerController.getOrders)

module.exports = Router;