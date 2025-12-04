const db = require('../config/db');
const {DataTypes} = require('sequelize');

const SimpleUser = db.define('simpleUser', {
    login: {type: DataTypes.STRING, primaryKey: true},
    password: {type: DataTypes.STRING, allowNull: false},
    firstName: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING, allowNull: false}
});

const SessionUser = db.define('sessionUser', {
    login: {type: DataTypes.STRING, primaryKey: true},
    password: {type: DataTypes.STRING, allowNull: false},
    firstName: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    allowNotify: {type: DataTypes.BOOLEAN, defaultValue: false}
});

const Session = db.define('session', {
    id: {type: DataTypes.UUID, primaryKey: true},
    userAgent: {type: DataTypes.STRING, allowNull: false}
});

SessionUser.hasMany(Session);
Session.belongsTo(SessionUser);

module.exports = {
    SimpleUser,
    SessionUser,
    Session
};