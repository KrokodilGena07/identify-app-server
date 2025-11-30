const db = require('../config/db');
const {DataTypes} = require('sequelize');

const SimpleUser = db.define('simpleUser', {
    login: {type: DataTypes.STRING, primaryKey: true},
    password: {type: DataTypes.STRING, allowNull: false},
    firstName: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING, allowNull: false}
});

module.exports = {
    SimpleUser
};