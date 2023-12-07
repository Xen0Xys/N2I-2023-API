/* eslint-disable no-unused-vars */
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.bulkInsert("quiz_data", [
            {
                id: 1,
                image: "https://unsplash.com/photos/person-writing-on-white-paper-qDgTQOYk6B8",
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
                image: "https://unsplash.com/photos/person-writing-on-white-paper-qDgTQOYk6B8",
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
