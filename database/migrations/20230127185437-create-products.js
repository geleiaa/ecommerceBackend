'use strict';

const {Sequelize, DataTypes} = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
      preco: {
        type: Sequelize.DataTypes.FLOAT(11),
        allowNull: false
      },
      quatidadeestq: {
        type: Sequelize.DataTypes.INTEGER,
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

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};
