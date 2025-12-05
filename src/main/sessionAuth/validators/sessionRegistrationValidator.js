const registrationValidator = require('../../shared/validators/registrationValidator');
const {body} = require('express-validator');

const sessionRegistrationValidator = [
    ...registrationValidator,
    body('email', 'email is wrong').isEmail(),
    body('allowNotify', 'allowNotify is invalid').optional().isBoolean()
];

module.exports = sessionRegistrationValidator;