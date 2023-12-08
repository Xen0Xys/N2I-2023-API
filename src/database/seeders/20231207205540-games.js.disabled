/* eslint-disable no-unused-vars */
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.bulkInsert("Games", [
            {
                id: 1,
                user_id: 1,
                current_progress: 0,
                is_finished: false,
                created_at: new Date(),
                updated_at: new Date()
            }
        ]);
    },

    async down(queryInterface, Sequelize){
        await queryInterface.bulkDelete("Games", {id: 1});
    }
};
