const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./../../server/db');

const Produtos = require('./productsModel');
const Clientes = require('./clientModel');

const Pedidos = sequelize.define('pedidos', {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    produtoId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Produtos',
            key: 'id'
        }
    },
    clienteId: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Clientes',
            key: 'id'
        }
    },
    quantidadeDoProd: {
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

Pedidos.belongsTo(Clientes) 
Pedidos.belongsTo(Produtos)

// relacionamentos entre Pedidos e Clientes, Pedidos e Produtos são de One-To-One
// esse é o único ponto de relacionamento das tabelas

module.exports = Pedidos;