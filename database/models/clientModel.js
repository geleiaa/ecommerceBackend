const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('./../../server/db');

const Client = sequelize.define('clients', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false   
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    tel: {
        type: DataTypes.INTEGER(15),
        allowNull: false
    },
    createdAt: new Date(),
    updatedAt: new Date()
})

module.exports = Client;