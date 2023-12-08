/* eslint-disable no-unused-vars */
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.createTable("quiz_rounds", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            game_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "games",
                    key: "id"
                },
                onDelete: "CASCADE",
            },
            quiz_data_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "quiz_data",
                    key: "id"
                },
                onDelete: "CASCADE",
            },
            current_score: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            is_finished: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
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
        await queryInterface.dropTable("quiz_rounds");
    }
};
