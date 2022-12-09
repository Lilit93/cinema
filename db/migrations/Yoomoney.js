const {DataTypes: Sequelize} = require("sequelize");

module.exports = {
    up: async  (queryInterface, Sequelize) => queryInterface.createTable('Yoomoney',{
            id: {
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            RequestId: {
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            ContractAmount: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            Commission: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            Amount: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            Balance: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            ReservationId: {
                primaryKey: true,
                allowNull: false,
                type: Sequelize.INTEGER,
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

    down: async  (queryInterface, Sequelize) => queryInterface.sequelize.query('DROP TABLE "Yoomoney"')
};
