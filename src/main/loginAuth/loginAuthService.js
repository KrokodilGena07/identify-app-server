const {SimpleUser} = require('../../models');
const ApiError = require('../../error/ApiError');
const bcrypt = require('bcrypt');
const UserDTO = require('./dtos/UserDTO');

class LoginAuthService {
    async registration({login, password, firstName, lastName}) {
        const candidate = await SimpleUser.findByPk(login);
        if (candidate) {
            throw ApiError.badRequest('This name has already taken');
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const newUser = await SimpleUser.create(
            {login, password: hashPassword, firstName, lastName}
        );

        return new UserDTO(newUser);
    }

    async checkLogin(login) {
        const data = await SimpleUser.findByPk(login);
        return {isTaken: !!data};
    }

    async signIn({login, password}) {
        const user = await SimpleUser.findByPk(login);
        if (!user) {
            throw ApiError.badRequest('Login is wrong');
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if (!isPasswordEqual) {
            throw ApiError.badRequest('Password is wrong');
        }

        return new UserDTO(user);
    }
}

module.exports = new LoginAuthService();