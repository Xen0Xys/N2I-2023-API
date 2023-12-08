/* eslint-disable no-unused-vars */
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class MemoryRounds extends Model{
        static associate(models){
            MemoryRounds.belongsTo(models.Games, {
                foreignKey: "game_id",
                as: "game",
            });
        }
    }
    MemoryRounds.init({
        game_id: DataTypes.INTEGER,
        memory_data: DataTypes.STRING,
        current_score: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        is_finished: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, {
        sequelize,
        modelName: "MemoryRounds",
        createdAt: "created_at",
        updatedAt: "updated_at",
    });
    return MemoryRounds;
};
