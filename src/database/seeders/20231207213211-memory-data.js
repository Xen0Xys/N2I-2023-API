/* eslint-disable no-unused-vars */
module.exports = {
    async up(queryInterface, Sequelize){
        await queryInterface.bulkInsert("memory_data", [
            {
                id: 1,
                image: "https://images.unsplash.com/photo-1528569937393-ee892b976859?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 2,
                image: "https://images.unsplash.com/photo-1533158307587-828f0a76ef46?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 3,
                image: "https://images.unsplash.com/photo-1497030947858-3f40f1508e84?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 4,
                image: "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?q=80&w=2118&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 5,
                image: "https://plus.unsplash.com/premium_photo-1687382111414-7b87afa5da34?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 6,
                image: "https://images.unsplash.com/photo-1531845116688-48819b3b68d9?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 7,
                image: "https://images.unsplash.com/photo-1598623549917-a38dc6cd19b5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 8,
                image: "https://images.unsplash.com/photo-1521979548744-463128ea80d8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 9,
                image: "https://images.unsplash.com/photo-1532387482281-c56ef57652ec?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 10,
                image: "https://images.unsplash.com/photo-1622599741853-26aa6353a5d0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
