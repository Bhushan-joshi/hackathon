const express = require('express');
const buyerController = require('../Controllers/buyerController');
const Router = express.Router();
const isAuth =require('../Util/isAuth');

Router.get('/', isAuth,buyerController.getIndex);

module.exports = Router;