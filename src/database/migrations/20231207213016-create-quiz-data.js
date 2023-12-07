/* eslint-disable no-unused-vars */
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.createTable("quiz_data", {
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
            right_answer: {
                type: Sequelize.STRING
            },
            wrong_answer_1: {
                type: Sequelize.STRING
            },
            wrong_answer_2: {
                type: Sequelize.STRING
            },
            wrong_answer_3: {
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
        await queryInterface.dropTable("quiz_data");
    }
};
