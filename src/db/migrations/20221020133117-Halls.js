const {DataTypes: Sequelize} = require("sequelize");

module.exports = {
  up: async  (queryInterface, Sequelize) => queryInterface.createTable('Halls',{
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updateAt:{
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW,
        }
      },
      {
      freezeTableName: true,
      schema: 'public',
      timestamps: false}),

  down: async  (queryInterface, Sequelize)  => queryInterface.sequelize.query('DROP TABLE "Halls"'

  )
};
