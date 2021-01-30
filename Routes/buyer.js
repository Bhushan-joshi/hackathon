const express = require('express');
const buyerController = require('../Controllers/buyerController');
const Router = express.Router();

Router.get('/', buyerController.getIndex);

module.exports = Router;