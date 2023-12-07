/* eslint-disable no-unused-vars */
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.createTable("info_data", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            type: {
                type: Sequelize.STRING
            },
            url: {
                type: Sequelize.STRING
            },
            title: {
                type: Sequelize.STRING
            },
            content: {
                type: Sequelize.STRING
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize){
        await queryInterface.dropTable("info_data");
    }
};
