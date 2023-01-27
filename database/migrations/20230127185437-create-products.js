'use strict';

// const Client = require('../models/clientModel');
// const Products = require('../models/productsModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
          type: Sequelize.DataTypes.INTEGER,
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
      quatidadeEstq: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
  
      },
      createdAt: new Date(),
      updatedAt: new Date()
  })
  
  Client.hasOne(Products)
  Products.belongTo(Client, {
      foreingkey: 'prodId'
  })
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
