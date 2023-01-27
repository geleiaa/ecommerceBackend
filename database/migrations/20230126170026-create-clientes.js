'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('clients', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.DataTypes.STRING(20),
        allowNull: false
      },
      email: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false
      },
      tel: {
        type: Sequelize.DataTypes.INTEGER(15),
        allowNull: false
      },
      createdAt: new Date(),
      updatedAt: new Date()
    })
  },

  async down(queryInterface, Sequelize) {
   await queryInterface.dropTable('clients');
}
};
