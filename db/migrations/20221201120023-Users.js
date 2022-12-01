const {DataTypes: Sequelize} = require("sequelize");

module.exports = {
  up: async  (queryInterface, Sequelize) => queryInterface.createTable('Users',{
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: Sequelize.INTEGER,
  },
  email: {
      type: Sequelize.STRING,
      allowNull: false,
  },
  lastName: {
      type: Sequelize.STRING,
      allowNull: false
  },
  firtName: {
      type: Sequelize.STRING,
      allowNull: false,
  },
  phone: {
      type: Sequelize.STRING,
      allowNull: false,
  },
  password: {
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
  }, {
    freezeTableName: true,
    schema: 'public',
    timestamps: false
  }),

  down: async  (queryInterface, Sequelize) => queryInterface.sequelize.query('DROP TABLE "Users"')
};
