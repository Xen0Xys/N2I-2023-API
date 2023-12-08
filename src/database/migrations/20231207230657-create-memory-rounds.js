/* eslint-disable no-unused-vars */
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.createTable("memory_rounds", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            game_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "games",
                    key: "id"
                },
                onDelete: "CASCADE",
            },
            memory_data: {
                type: Sequelize.STRING
            },
            current_score: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable("memory_rounds");
    }
};
