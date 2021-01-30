const express = require('express');
const sellerController = require('../Controllers/sellerController');
const Router = express.Router();

Router.get('/add', sellerController.getIndex);
Router.post('/add', sellerController.addProduct);


module.exports = Router;