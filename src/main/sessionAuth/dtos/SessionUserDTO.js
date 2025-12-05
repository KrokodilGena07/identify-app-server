const UserDTO = require('../../shared/dtos/UserDTO');

class SessionUserDTO extends UserDTO {
    email;
    allowNotify;

    constructor(model) {
        super(model);
        this.email = model.email;
        this.allowNotify = model.allowNotify;
    }
}

module.exports = SessionUserDTO;