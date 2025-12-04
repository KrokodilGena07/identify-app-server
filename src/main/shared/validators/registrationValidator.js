const {body} = require('express-validator');

const useSymbols = 'Use 1-255 characters'

const registrationValidator = [
    body('login', useSymbols).isLength({min: 1, max: 255}),
    body('password', 'Use 5-20 characters').isLength({min: 5, max: 20}),
    body('firstName', useSymbols).isLength({min: 1, max: 255}),
    body('lastName', useSymbols).isLength({min: 1, max: 255})
];

module.exports = registrationValidator