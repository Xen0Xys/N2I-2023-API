/* eslint-disable no-unused-vars */
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.bulkInsert("info_rounds", [
            {
                id: 1,
                game_id: 1,
                info_data_id: 1,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: 2,
                game_id: 1,
                info_data_id: 2,
                created_at: new Date(),
                updated_at: new Date(),
            }
        ]);
    },

    async down(queryInterface, Sequelize){
        await queryInterface.bulkDelete("info_rounds", {
            id: [1, 2],
        });
    }
};
