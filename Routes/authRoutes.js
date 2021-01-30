const express = require('express');
const authController = require('../Controllers/authController');
const Router = express.Router();

Router.get('/', authController.getLogin);


module.exports = Router;