const sessionAuthService = require('./sessionAuthService');
const {validationResult, cookie} = require('express-validator');
const ApiError = require('../../error/ApiError');
const LoginController = require('../shared/LoginController');

const cookieOptions = {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: 'lax',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
}

class SessionAuthController extends LoginController {
    constructor(service) {
        super(service)
        this.checkLogin = this.checkLogin.bind(this);
    }

    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            const userAgent = req.headers['user-agent'];

            if (!errors.isEmpty() || !userAgent) {
                return next(ApiError.badRequest('Registration error', errors.array()));
            }

            const {user, sessionId} = await sessionAuthService.registration(req.body, userAgent);
            res.cookie('sessionId', sessionId, cookieOptions);
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async signIn(req, res, next) {
        try {
            const userAgent = req.headers['user-agent'];
            if (!req.body?.login || !req.body?.password) {
                return next(ApiError.badRequest('Login or password is empty'));
            }
            if (!userAgent) {
                return next(ApiError.badRequest('User-Agent is empty'));
            }

            const {user, sessionId} = await sessionAuthService.signIn(req.body, userAgent);
            res.cookie('sessionId', sessionId, cookieOptions);
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {sessionId} = req.cookies;
            await sessionAuthService.logout(sessionId);
            res.clearCookie('sessionId');
            res.status(204).end();
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {sessionId} = req.cookies;
            if (!sessionId) {
                return next(ApiError.unauthorized());
            }

            const {isFounded} = await sessionAuthService.refresh(sessionId);
            if (!isFounded) {
                return next(ApiError.unauthorized());
            }
            res.cookie('sessionId', sessionId, cookieOptions);
            res.status(204).end();
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new SessionAuthController(sessionAuthService);