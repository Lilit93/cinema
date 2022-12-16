const {DataTypes: Sequelize} = require("sequelize");

module.exports = {
  up: async  (queryInterface, Sequelize) => queryInterface.createTable('Chairs',{
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    hallId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model:'Halls',
        key: 'id'
      },
      onDelete: 'cascade',
    },
    row: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    chair: {
      type: Sequelize.INTEGER,
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
  }, {
    freezeTableName: true,
    schema: 'public',
    timestamps: false
  }),

  down: async  (queryInterface, Sequelize) => queryInterface.sequelize.query('DROP TABLE "Chairs"'

  )

};
