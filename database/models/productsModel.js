const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./../../server/db');


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
    estoque: {
        type: DataTypes.INTEGER(50),
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


module.exports = Produtos;