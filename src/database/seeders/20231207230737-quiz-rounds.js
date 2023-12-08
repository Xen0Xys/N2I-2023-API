/* eslint-disable no-unused-vars */
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.bulkInsert("quiz_rounds", [
            {
                id: 1,
                game_id: 1,
                quiz_data_id: 1,
                is_finished: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: 2,
                game_id: 1,
                quiz_data_id: 2,
                is_finished: false,
                created_at: new Date(),
                updated_at: new Date(),
            }
        ]);
    },

    async down(queryInterface, Sequelize){
        await queryInterface.bulkDelete("quiz_rounds", {
            id: [1, 2],
        });
    }
};
