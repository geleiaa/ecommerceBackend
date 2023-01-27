const Client = require('./../models/clientModel');
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('./../../server/db');

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
    preço: {
        type: DataTypes.FLOAT(11),
        allowNull: false
    },
    quatidadeEstq: {
        type: DataTypes.INTEGER,
        allowNull: false,

    },
    createdAt: new Date(),
    updatedAt: new Date()
})

Client.hasOne(Products)
Products.belongTo(Client, {
    foreingkey: 'prodId'
})

module.exports = Products;