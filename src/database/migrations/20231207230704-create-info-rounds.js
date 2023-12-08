/* eslint-disable no-unused-vars */
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.createTable("info_rounds", {
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
            info_data_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "info_data",
                    key: "id"
                },
                onDelete: "CASCADE",
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
        await queryInterface.dropTable("info_rounds");
    }
};
