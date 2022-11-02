import { DataTypes as Sequelize } from 'sequelize'

const ChairSchema = {
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
};
const ChairOptions = {
    freezeTableName: true,
    schema: 'public',
    timestamps: false

};
const ChairAssociation = (schema) => {
    schema.Chairs.belongsTo(schema.Halls, {
        as: 'hall',
        foreignKey: 'hallId',
        onDelete: 'CASCADE',
    });
    schema.Chairs.hasOne(schema.Reservations, {
        as: 'reservation',
        foreignKey: 'reservationId',
        targetKey: 'id',
        onDelete: 'CASCADE',
    });
};
export const getModel = (seq) => {
    const model = seq.define('Chairs', ChairSchema, ChairOptions);
    model.associate = ChairAssociation;
    return model;
}

