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
        onDelete: 'CASCADE',
    },
    UserId: {
        type: Sequelize.INTEGER,
        alowNull: false,
        references: {
            model:'Users',
            key: 'id'
          },
        onDelete: 'CASCADE'
    },
    payed:{
        type: Sequelize.BOOLEAN,
        defaultValue: false

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
    schema.Reservations.belongsTo(schema.Users, {
        as: 'UsersReservation',
        foreignKey: 'UserId',
        onDelete: 'CASCADE',
    });
}
export const getModel = (seq) => {
    const model =  seq.define('Reservations', ReservationSchema, ReservationOptions);
    model.associate = ReservationAssociation;
    return model
    
}
