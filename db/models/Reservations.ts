import { DataTypes as Sequelize } from 'sequelize'

const ReservationSchema = {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER,
    },
    TimelineId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model:'Timelines',
            key: 'id'
        },
        onDelete: 'cascade',
    },
    ChairId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model:'Chairs',
            key: 'id'
        },
        onDelete: 'cascade',
    },
    reservation: {
        type: Boolean,
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
const ReservationOptions = {
    freezeTableName: true,
    schema: 'public',
    timestamps: false
};
const ReservationAssociation = (schema) => {
    schema.Reservations.hasOne(schema.Timelines, {
        as: 'timelines',
        foreignKey: 'timelineId',
        targetKey: 'id',
        onDelete: 'CASCADE',
    });
    schema.Reservations.hasOne(schema.Chairs, {
        as: 'chairs',
        foreignKey: 'Id',
        onDelete: 'CASCADE',
    });
}
export const getModel = (seq) => {
    return seq.define('Reservations', ReservationSchema, ReservationOptions)
}
