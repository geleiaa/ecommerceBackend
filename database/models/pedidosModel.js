const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./../../server/db');

const Produtos = require('./productsModel');
const Clientes = require('./clientModel');

const Pedidos = sequelize.define('pedidos', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
        primaryKey: true
    },
    produtoId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Produtos',
            key: 'id'
        }
    },
    clienteId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Clientes',
            key: 'id'
        }
    },
    quantidadeDoProd: {
        type: DataTypes.INTEGER,
        allowNull: false
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

Pedidos.belongsTo(Clientes) 
Pedidos.belongsTo(Produtos)

// relacionamentos entre Pedidos e Clientes, Pedidos e Produtos são de One-To-One
// esse é o único ponto de relacionamento das tabelas

module.exports = Pedidos;