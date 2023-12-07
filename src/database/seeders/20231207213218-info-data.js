/* eslint-disable no-unused-vars */
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.bulkInsert("info_data", [
            {
                id: 1,
                type: "image",
                url: "https://unsplash.com/photos/info-arrow-signage-8JFMYz-a8Xo",
                title: "Info",
                content: "A sign that says info",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 2,
                type: "image",
                url: "https://unsplash.com/photos/classified-page-5-newspaper-selective-focus-photography-bSlHKWxxXak",
                title: "Classified",
                content: "A newspaper classified page",
                created_at: new Date(),
                updated_at: new Date()
            }
            ,
            {
                id: 3,
                type: "video",
                url: "https://www.youtube.com/watch?v=9XkHBmE-N34&pp=ugMICgJmchABGAHKBQtpbmZvcm1hdGlvbg%3D%3D",
                title: "Video",
                content: "A video about the info page",
                created_at: new Date(),
                updated_at: new Date()
            }
        ]);
    },

    async down(queryInterface, Sequelize){
        await queryInterface.bulkDelete("info_data", {
            id: [1, 2, 3],
        });
    }
};
