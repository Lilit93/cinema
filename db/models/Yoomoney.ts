import { DataTypes as Sequelize } from 'sequelize'

const YoomoneySchema = {
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
};
const YoomoneyOptions = {
    freezeTableName: true,
    schema: 'public',
    timestamps: false
};
const YoomoneyAssociation = (schema) => {
    schema.Yoomoney.hasOne(schema.Reservations, {
        as: 'Reservations',
        foreignKey: 'id',
        onDelete: 'CASCADE',
    });
}
export const getModel = (seq) => {
    const model= seq.define('Yoomoney', YoomoneySchema, YoomoneyOptions);
    model.associate = YoomoneyAssociation;
    return model;
};
