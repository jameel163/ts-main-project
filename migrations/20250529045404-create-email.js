'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('emails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.STRING
      },
      html: {
        type: Sequelize.TEXT
      }
    },
  {timestamps:false});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('emails');
  }
};