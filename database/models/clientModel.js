const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./../../server/db');

const Products = require('./productsModel');

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
    prodId: {
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
});

//Products.hasOne(Client)
Products.belongsTo(Client, {
    constranis: true,
    foreingkey: 'prodId'
})

// Client.hasMany(Products, {
//     foreingkey: 'prodId'
// })

module.exports = Client;