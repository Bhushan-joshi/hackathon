const express = require('express');
const authController = require('../Controllers/authController');
const Router = express.Router();

Router.get('/', authController.getIndex);

Router.post('/register/buyer',authController.buyerRegister);
Router.post('/register/seller',authController.sellerRegister);

Router.get('/login',authController.getLogin)
Router.post('/login',authController.postLogin);
Router.post('/logout',authController.postLogout);


module.exports = Router;