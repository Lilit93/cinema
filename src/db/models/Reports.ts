import { DataTypes as Sequelize } from 'sequelize';

const ReportsSchema = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
    },
    pathToFile:{
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
};
const ReportsOptions = {
    freezeTableName: true,
    schema: 'public',
    timestamps: false
};

export const getModel = (seq) => {
    const model= seq.define('Reports', ReportsSchema, ReportsOptions);
    return model
}
