/* eslint-disable no-unused-vars */
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.bulkInsert("right_price_data", [
            {
                id: 1,
                image: "https://images.unsplash.com/photo-1516937941344-00b4e0337589?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                question: "En 2021, les émissions de CO2 en France avoisinaient les...",
                answer: "441",
                order_of_magnitude: "millions de tonnes métriques",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 2,
                image: "https://images.unsplash.com/photo-1569629743817-70d8db6c323b?q=80&w=2398&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                question: "Avant la pandémie de COVID-19, la France enregistrait ... millions de passagers aériens internationaux",
                answer: "80",
                order_of_magnitude: "millions",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 3,
                image: "https://images.unsplash.com/photo-1588347818036-558601350947?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                question: "Combien de kilogrammes carbone équivalent peut atteindre un steak de 250g ?",
                answer: "7",
                order_of_magnitude: "kg CO2e",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 4,
                image: "",
                question: "En 2020, une voiture neuve émettait environ ... grammes de CO2 par kilomètre.",
                answer: "93",
                order_of_magnitude: "g CO2/km",
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
