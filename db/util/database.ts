
const Sequelize =require ('sequelize');
const sequelize = new Sequelize("cinema", "postgres","postgres",{
    dialect: "postgres",
    host:"localhost",
});
module.exports = sequelize;