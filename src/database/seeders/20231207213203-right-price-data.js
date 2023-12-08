/* eslint-disable no-unused-vars */
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.bulkInsert("right_price_data", [
            {
                id: 1,
                image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                question: "What is the price of this laptop?",
                answer: "500",
                order_of_magnitude: "Units",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 2,
                image: "https://plus.unsplash.com/premium_photo-1681666713677-8bd559bef6bb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                question: "What is the cost of a cow?",
                answer: "1000",
                order_of_magnitude: "Units",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 3,
                image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                question: "What is the number of people in the world?",
                answer: "7",
                order_of_magnitude: "Billions",
                created_at: new Date(),
                updated_at: new Date()
            }
        ]);
    },

    async down(queryInterface, Sequelize){
        await queryInterface.bulkDelete("right_price_data", {
            id: [1, 2, 3],
        });
    }
};
