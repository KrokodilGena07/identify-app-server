class UserDTO {
    constructor(model) {
        this.login = model.login;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
    }
}

module.exports = UserDTO;