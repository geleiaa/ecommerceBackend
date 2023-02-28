const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./../../server/db');

const Clientes = sequelize.define('clientes', {
    id: {
        type: Sequelize.DataTypes.UUID,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false
    },
    email: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false
    },
    tel: {
        type: Sequelize.DataTypes.INTEGER(15),
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
    }
}, {
    freezeTableName: true
})

module.exports = Clientes;