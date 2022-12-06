
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.addColumn('Reservations', 'payed',{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        })
    },

    async down(queryInterface, Sequelize){
        await queryInterface.dropTable('Reservations', 'payed');
    },
}