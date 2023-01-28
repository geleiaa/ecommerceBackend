'use strict';

const {Sequelize, DataTypes} = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('clients', 'prodId', {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
    });
     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('clients', 'prodId');
     
  }
};
