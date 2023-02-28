const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./../../server/db');


const Produtos = sequelize.define('produtos', {
    id: {
        type: Sequelize.DataTypes.UUID,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false
    },
    preço: {
        type: Sequelize.DataTypes.FLOAT(11),
        allowNull: false
    },
    estoque: {
        type: Sequelize.DataTypes.INTEGER,
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


module.exports = Produtos;