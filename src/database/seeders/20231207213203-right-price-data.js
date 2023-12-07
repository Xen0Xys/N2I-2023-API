/* eslint-disable no-unused-vars */
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.bulkInsert("right_price_data", [
            {
                id: 1,
                image: "https://unsplash.com/photos/black-and-silver-laptop-computer-IrRbSND5EUc",
                question: "What is the price of this laptop?",
                answer: "500",
                order_of_magnitude: "Units",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 2,
                image: "https://unsplash.com/photos/black-and-silver-laptop-computer-IrRbSND5EUc",
                question: "What is the cost of a cow?",
                answer: "1000",
                order_of_magnitude: "Units",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 3,
                image: "https://unsplash.com/photos/black-and-silver-laptop-computer-IrRbSND5EUc",
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
