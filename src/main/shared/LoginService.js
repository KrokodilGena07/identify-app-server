const ApiError = require('../../error/ApiError');
const bcrypt = require('bcrypt');

class LoginService {
    model;

    constructor(model) {
        this.model = model;
    }

    async checkLogin(login) {
        const data = await this.model.findByPk(login);
        return {isTaken: !!data};
    }

    async _isCandidate(login) {
        const candidate = await this.model.findByPk(login);
        if (candidate) {
            throw ApiError.badRequest('This name has already taken');
        }
    }

    async _getHashPassword(password) {
        return bcrypt.hash(password, 5);
    }

    async _authorizedUser({login, password}) {
        const user = await this.model.findByPk(login);
        if (!user) {
            throw ApiError.badRequest('Login is wrong');
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if (!isPasswordEqual) {
            throw ApiError.badRequest('Password is wrong');
        }

        return user;
    }
}

module.exports = LoginService;