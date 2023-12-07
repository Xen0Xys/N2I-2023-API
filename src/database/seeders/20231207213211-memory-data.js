/* eslint-disable no-unused-vars */
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.bulkInsert("memory_data", [
            {
                id: 1,
                image: "https://unsplash.com/photos/person-opening-photo-album-displaying-grayscale-photos-73OJLcahQHg",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 2,
                image: "https://unsplash.com/photos/a-pile-of-old-photos-and-postcards-sitting-on-top-of-each-other-P2aOvMMUJnY",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 3,
                image: "https://unsplash.com/photos/woman-lying-on-bed-covering-her-face-surrounded-by-photos-and-white-camera-FgSyP02I0gw",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 4,
                image: "https://unsplash.com/photos/assorted-photos-on-beige-wooden-table-aV5xrpB0bwQ",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 5,
                image: "https://unsplash.com/photos/a-woman-holding-a-polaroid-camera-and-a-polaroid-card-T68IMQs6uTY",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 6,
                image: "https://unsplash.com/photos/several-portraits-on-top-of-white-textile-qqd8APhaOg4",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 7,
                image: "https://unsplash.com/photos/woman-in-white-long-sleeve-shirt-holding-white-printer-paper-IB_x2fNdLEw",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 8,
                image: "https://unsplash.com/photos/purple-flowers-on-brown-open-book-1tCQcTjLoRQ",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 9,
                image: "https://unsplash.com/photos/assorted-photos-on-white-textile-7l8z2pIbHYk",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 10,
                image: "https://unsplash.com/photos/black-and-red-game-cartridge-RZwbk4Kc2xg",
                created_at: new Date(),
                updated_at: new Date()
            }
        ]);
    },

    async down(queryInterface, Sequelize){
        await queryInterface.bulkDelete("memory_data", {
            id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        });
    }
};
