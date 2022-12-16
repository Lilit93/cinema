import { DataTypes as Sequelize } from 'sequelize';

const HallSchema = {
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
};
const HallOptions = {
    freezeTableName: true,
    schema: 'public',
    timestamps: false
};
const HallAssociation = (schema) => {
    schema.Halls.hasMany(schema.Timelines,{
        as:'hallTimelines',
        foreignKey:'id',
        targetKey: 'hallId',
        onDelete: 'CASCADE',
    });
    schema.Halls.hasMany(schema.Chairs, {
        as: 'hallChairs',
        foreignKey:'hallId',
        onDelete:'CASCADE'
    });
};

export const getModel = (seq) => {
    const model= seq.define('Halls', HallSchema, HallOptions)
    model.associate = HallAssociation;
    return model;
};


