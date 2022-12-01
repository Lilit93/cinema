import { DataTypes as Sequelize } from 'sequelize'

const ReservationSchema = {
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
    }
};
const ReservationOptions = {
    freezeTableName: true,
    schema: 'public',
    timestamps: false
};
const ReservationAssociation = (schema) => {
    schema.Reservations.belongsTo(schema.Timelines, {
        as: 'timelinesReservations',
        foreignKey: 'timelineId',
        onDelete: 'CASCADE',
    });
    schema.Reservations.belongsTo(schema.Chairs, {
        as: 'chairs',
        foreignKey: 'chairId',
        onDelete: 'CASCADE',
    });
}
export const getModel = (seq) => {
    const model =  seq.define('Reservations', ReservationSchema, ReservationOptions);
    model.associate = ReservationAssociation;
    return model
    
}
