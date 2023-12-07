/*eslint-disable no-unused-vars*/
const {hashPassword} = require("../../lib/utils/encryption");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize){
        return queryInterface.bulkInsert("users", [
            {
                firstName: "John",
                lastName: "Doe",
                countryCode: "FR",
                email: "john.doe@example.com",
                password: await hashPassword("123456"),
                groupId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: "Jane",
                lastName: "Doe",
                countryCode: "FR",
                email: "jane.doe@example.com",
                password: await hashPassword("123456"),
                groupId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                firstName: "Foo",
                lastName: "Bar",
                countryCode: "FR",
                email: "foo.bar@example.com",
                password: await hashPassword("123456"),
                groupId: 2,
                createdAt: new Date(),
                updatedAt: new Date(new Date().setFullYear(new Date().getFullYear() - 4))
            }
        ], {});
    },

    async down(queryInterface, Sequelize){
        return queryInterface.bulkDelete("users", null, {});
    }
};
