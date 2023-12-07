/* eslint-disable no-unused-vars */
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.createTable("right_price_data", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            image: {
                type: Sequelize.STRING,
                allowNull: true
            },
            question: {
                type: Sequelize.STRING
            },
            answer: {
                type: Sequelize.INTEGER
            },
            order_of_magnitude: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable("right_price_data");
    }
};
