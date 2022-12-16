'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Reservations','UserId',{
      type: Sequelize.INTEGER,
      allowNull:false,
      references: {
        model:'Users',
        key: 'id'
      },
      onDelete: 'cascade',
    })
  }
};
