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
        references: {
            model: 'Products',
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
});

//Client.hasOne(Products)
Products.belongsTo(Client, {
    foreignkey: 'prodId'
})

// Client.hasMany(Products, {
//     foreingkey: 'prodId'
// })

module.exports = Client;