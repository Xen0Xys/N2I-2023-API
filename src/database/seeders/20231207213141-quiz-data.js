/* eslint-disable no-unused-vars */
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.bulkInsert("quiz_data", [
            {
                id: 1,
                image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                question: "What is the capital of France?",
                right_answer: "Paris",
                wrong_answer_1: "Marseille",
                wrong_answer_2: "Lyon",
                wrong_answer_3: "Toulouse",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: 2,
                question: "What is the capital of Spain?",
                right_answer: "Madrid",
                wrong_answer_1: "Barcelona",
                wrong_answer_2: "Seville",
                wrong_answer_3: "Valencia",
                created_at: new Date(),
                updated_at: new Date(),
            },
            {
                id: 3,
                image: "https://plus.unsplash.com/premium_photo-1681248156511-200ffb3b66cc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                question: "What is the capital of Germany?",
                right_answer: "Berlin",
                wrong_answer_1: "Hamburg",
                wrong_answer_2: "Munich",
                wrong_answer_3: "Cologne",
                created_at: new Date(),
                updated_at: new Date(),
            }
        ]);
    },

    async down(queryInterface, Sequelize){
        await queryInterface.bulkDelete("quiz_data", {
            id: [1, 2, 3],
        });
    }
};
