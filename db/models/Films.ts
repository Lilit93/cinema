import { DataTypes as Sequelize } from 'sequelize'
const FilmSchema = {
        id: {
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                type: Sequelize.INTEGER,
        },
        name:{
                type: Sequelize.STRING,
                allowNull: false,
        },
        price: {
                type:Sequelize.INTEGER,
                allowNull: false,
        },
        duration: {
                type: Sequelize.INTEGER,
                allowNull: false
        },
        language: {
                type:Sequelize.STRING,
                allowNull: false
        },
        categories: {
                type: Sequelize.STRING,
                allowNull: true
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
const FilmOptions = {
        freezeTableName: true,
        schema: 'public',
        timestamps: false

};
const FilmAssociation = (schema) => {
        schema.Films.hasMany(schema.Timelines,{
                as:'timelines',
                foreignKey:'filmId',
                targetKey:'Id',
                onDelete:'CASCADE',
        })
};
export const getModel = (seq) => {
        const model= seq.define('Films', FilmSchema, FilmOptions);
        model.associate = FilmAssociation;
        return model
}


