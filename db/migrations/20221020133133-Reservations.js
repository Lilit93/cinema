const {DataTypes: Sequelize} = require("sequelize");

module.exports = {
  up: async  (queryInterface, Sequelize) => queryInterface.createTable('Reservations',{
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    timelineId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model:'Timelines',
        key: 'id'
      },
      onDelete: 'cascade',
    },
    chairId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model:'Chairs',
        key: 'id'
      },
      onDelete: 'cascade',
    },
  
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
        },
    updateAt:{
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
        },
  },
  {
    freezeTableName: true,
    schema: 'public',
    timestamps: false
  }),

  down: async  (queryInterface, Sequelize) => queryInterface.sequelize.query('DROP TABLE "Reservations"')
};
