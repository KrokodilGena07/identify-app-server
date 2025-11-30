const express = require('express');
const loginAuthController = require('./loginAuthController');
const registrationValidator = require('./validators/registrationValidator');

const loginAuthRouter = express.Router();

loginAuthRouter.post('/registration', ...registrationValidator, loginAuthController.registration);
loginAuthRouter.post('/sign-in', loginAuthController.signIn);
loginAuthRouter.get('/:login', loginAuthController.checkLogin);

module.exports = loginAuthRouter;