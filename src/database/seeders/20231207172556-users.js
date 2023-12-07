/* eslint-disable no-unused-vars */
require("module-alias/register");
const encryption = require("@utils/encryption");
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.bulkInsert("users", [
            {
                id: 1000,
                username: "admin",
                password: await encryption.hashPassword("password"),
                created_at: new Date(),
                updated_at: new Date()
            }
        ]);
    },

    async down(queryInterface, Sequelize){
        await queryInterface.bulkDelete("users", {id: 1000});
    }
};
