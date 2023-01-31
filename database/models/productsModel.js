const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./../../server/db');

const Pedidos = require('./pedidosModel');
const Estoque = require('./estoqueModel');

const Produtos = sequelize.define('produtos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    preço: {
        type: DataTypes.FLOAT(11),
        allowNull: false
    },
    estoqueId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Estoque',
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


Produtos.belongsTo(Estoque);

module.exports = Produtos;