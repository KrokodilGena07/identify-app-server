const express = require('express');
const sessionAuthController = require('./sessionAuthController');
const sessionRegistrationValidator = require('./validators/sessionRegistrationValidator');

const sessionAuthRouter = express.Router();

sessionAuthRouter.post('/registration', ...sessionRegistrationValidator, sessionAuthController.registration);
sessionAuthRouter.post('/sign-in', sessionAuthController.signIn);
sessionAuthRouter.post('/logout', sessionAuthController.logout);
sessionAuthRouter.get('/check/:login', sessionAuthController.checkLogin);
sessionAuthRouter.get('/refresh', sessionAuthController.refresh);

module.exports = sessionAuthRouter;