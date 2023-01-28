const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./../../server/db');
const Client = require('./clientModel');

const Products = sequelize.define('products', {
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
    preco: {
        type: DataTypes.FLOAT(11),
        allowNull: false
    },
    quatidadeestq: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
    }
})

//Client.hasOne(Products)
// Products.belongsTo(Client, {
//     foreingkey: 'prodId'
// })

module.exports = Products;