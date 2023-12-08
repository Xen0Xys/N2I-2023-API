/* eslint-disable no-unused-vars */
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.createTable("right_price_rounds", {
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
                    key: "id",
                },
            },
            right_price_data_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "right_price_data",
                    key: "id",
                }
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
        await queryInterface.dropTable("right_price_rounds");
    }
};
