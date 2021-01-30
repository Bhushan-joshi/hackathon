const express = require('express');
const authController = require('../Controllers/authController');
const Router = express.Router();

Router.get('/', authController.getLogin);

Router.post('/register/buyer',authController.buyerRegister)
Router.post('/register/seller',authController.sellerRegister)

module.exports = Router;