const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./../../server/db');

const Produtos = require('./productsModel');

const Estoque = sequelize.define('estoque', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    produtoId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Produtos',
            key: 'id'
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    freezeTableName: true
})


module.exports = Estoque;