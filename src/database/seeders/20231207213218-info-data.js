/* eslint-disable no-unused-vars */
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.bulkInsert("info_data", [
            {
                id: 1,
                type: "image",
                url: "https://images.unsplash.com/photo-1560416313-414b33c856a9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                title: "Info",
                content: "A sign that says info",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 2,
                type: "image",
                url: "https://images.unsplash.com/photo-1504711331083-9c895941bf81?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
