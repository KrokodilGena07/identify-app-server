const LoginService = require('../shared/LoginService');
const {SessionUser, Session} = require('../../models');
const uuid = require('uuid');
const SessionUserDTO = require('./dtos/SessionUserDTO');
const ApiError = require('../../error/ApiError');

class SessionAuthService extends LoginService {
    async registration({firstName, lastName, password, login, email, allowNotify}, userAgent) {
        await super._isCandidate(login);

        const candidate = await SessionUser.findOne({where: {email}});
        if (candidate) {
            throw ApiError.badRequest('User with this email already exists');
        }

        const hashPassword = await super._getHashPassword(password);
        const newUser = await SessionUser.create(
            {login, password: hashPassword, firstName, lastName, email, allowNotify}
        );

        const session = await this.#getSession(login, userAgent);
        return {user: new SessionUserDTO(newUser), sessionId: session.id};
    }

    async signIn(data, userAgent) {
        const user = await super._authorizedUser(data);
        const session = await this.#getSession(data.login, userAgent);
        return {user: new SessionUserDTO(user), sessionId: session.id};
    }

    async #getSession(login, userAgent) {
        const session = await Session.findOne({where: {sessionUserLogin: login, userAgent}});
        if (!session) {
            const id = uuid.v4();
            return Session.create({
                id, userAgent, sessionUserLogin: login
            });
        }
        return session;
    }

    async refresh(sessionId) {
        const session = await Session.findByPk(sessionId);
        return {isFounded: !!session.id};
    }

    async logout(sessionId) {
        const session = await Session.findByPk(sessionId);
        if (!session) {
            throw ApiError.badRequest('Session id is incorrect');
        }

        await session.destroy();
    }
}

module.exports = new SessionAuthService(SessionUser);