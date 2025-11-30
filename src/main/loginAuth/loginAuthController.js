const loginAuthService = require('./loginAuthService');
const {validationResult} = require('express-validator');
const ApiError = require('../../error/ApiError');

class LoginAuthController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('Registration error', errors.array()));
            }

            const data = await loginAuthService.registration(req.body);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async checkLogin(req, res, next) {
        try {
            const {login} = req.params;
            const data = await loginAuthService.checkLogin(login);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    async signIn(req, res, next) {
        try {
            const body = req.body;
            if (!body?.login || !body?.password) {
                return next(ApiError.badRequest('Login or password is empty'));
            }

            const data = await loginAuthService.signIn(body);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new LoginAuthController();