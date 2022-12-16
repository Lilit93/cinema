module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.addColumn('Reservations', 'deleted',{
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        })
    },

    async down(queryInterface, Sequelize){
        await queryInterface.dropTable('Reservations', 'deleted');
    },
}
