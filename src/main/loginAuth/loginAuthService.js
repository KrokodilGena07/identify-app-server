const {SimpleUser} = require('../../models');
const LoginService = require('../shared/LoginService');
const UserDTO = require('../shared/dtos/UserDTO');

class LoginAuthService extends LoginService {
    async registration({login, password, firstName, lastName}) {
        await super._isCandidate(login);

        const hashPassword = await super._getHashPassword(password);
        const newUser = await SimpleUser.create(
            {login, password: hashPassword, firstName, lastName}
        );

        return new UserDTO(newUser);
    }

    async signIn(data) {
        const user =  super._authorizedUser(data);
        return new UserDTO(user);
    }
}

module.exports = new LoginAuthService(SimpleUser);