/* eslint-disable no-unused-vars */
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.bulkInsert("quiz_data", [
            {
                id: 1,
                image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=2484&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                question: "Quand je dois me déplacer, je dois privilégier :",
                right_answer: "Les transports en commun",
                wrong_answer_1: "Ma moto",
                wrong_answer_2: "Ma voiture",
                wrong_answer_3: "Mon jet privé",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 2,
                image: "",
                question: "Pour réduire ma consommation électrique, je peux :",
                right_answer: "Utiliser des équipements économes en énergie",
                wrong_answer_1: "Chauffer tout l'été pour ne pas avoir à chauffer l'hiver",
                wrong_answer_2: "Chauffer toute l'année",
                wrong_answer_3: "Rester les fenêtres ouvertes l'hiver",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 3,
                image: "",
                question: "Si je veux chauffer, je dois privilégier :",
                right_answer: "Le biogaz",
                wrong_answer_1: "Le pétrol",
                wrong_answer_2: "Le charbon",
                wrong_answer_3: "Le gaz",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 4,
                image: "",
                question: "En collectivité, je peux :",
                right_answer: "Partager mon véhicule pour des trajets en commun",
                wrong_answer_1: "Sauter dans le premier avion avec mon voisin",
                wrong_answer_2: "Emmener mon collègue au boulot en hélicoptère",
                wrong_answer_3: "Jouer de la flute pour mes chiens, à l'arrêt, le moteur allumé",
                created_at: new Date(),
                updated_at: new Date()
            }
        ]);
    },

    async down(queryInterface, Sequelize){
        await queryInterface.bulkDelete("quiz_data", {
            id: [1, 2, 3],
        });
    }
};
