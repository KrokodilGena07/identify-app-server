class LoginController {
    #service;

    constructor(service) {
        this.#service = service;
    }

    async checkLogin(req, res, next) {
        try {
            const {login} = req.params;
            const data = await this.#service.checkLogin(login);
            res.json(data);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = LoginController;