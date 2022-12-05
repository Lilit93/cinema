import { DataTypes as Sequelize } from 'sequelize'

const UserSchema = {
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
    firstName: {
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
};
const UserOptions = {
    freezeTableName: true,
    schema: 'public',
    timestamps: false

};
const UsersAssociation = (schema) => {
    schema.Users.hasMany(schema.Reservations,{
        as:'UsersReservation',
        foreignKey:'UserId',
        onDelete: 'CASCADE',
    });
};


export const getModel = (seq) => {
    const model = seq.define('Users', UserSchema, UserOptions, UsersAssociation);
    return model;
}

