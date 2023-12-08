/* eslint-disable no-unused-vars */
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.bulkInsert("memory_rounds", [
            {
                id: 1,
                game_id: 1,
                memory_data: "1;2;3;4;5;6;7;8;1;2;3;4;5;6;7;8",
                is_finished: true,
                created_at: new Date(),
                updated_at: new Date(),
            }
        ]);
    },

    async down(queryInterface, Sequelize){
        await queryInterface.bulkDelete("memory_rounds", {
            id: [1],
        });
    }
};
