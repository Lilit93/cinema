import { DataTypes as Sequelize } from 'sequelize'

const TimelineSchema = {
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
    filmId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model:'Films',
            key: 'id'
        },
        onDelete: 'cascade',
    },
    started:{
        type: Sequelize.DATE,
        allowNull: false,
    },
    ended:{
        type: Sequelize.DATE,
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
const TimelineOptions = {
    freezeTableName: true,
    schema: 'public',
    timestamps: false
};
const TimelineAssociation = (schema) => {
    schema.Timelines.hasMany(schema.Halls, {
        as: 'hall',
        foreignKey: 'id',
        sourceKey: 'hallId',
        onDelete: 'CASCADE',
    });
    schema.Timelines.hasMany(schema.Films, {
        as: 'film',
        foreignKey: 'id',
        sourceKey:'filmId',
        onDelete: 'CASCADE',
    });
};
export const getModel = (seq) => {
    const model = seq.define('Timelines', TimelineSchema, TimelineOptions);
    model.associate = TimelineAssociation;
    return model
};

