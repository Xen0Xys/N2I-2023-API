const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Games extends Model{
        static associate(models){
            Games.belongsTo(models.User, {
                foreignKey: "user_id",
            });
            Games.hasMany(models.QuizRounds, {
                foreignKey: "game_id",
                as: "quiz_rounds",
            });
            Games.hasMany(models.InfoRounds, {
                foreignKey: "game_id",
                as: "info_rounds",
            });
            Games.hasMany(models.MemoryRounds, {
                foreignKey: "game_id",
                as: "memory_rounds",
            });
            Games.hasMany(models.RightPriceRounds, {
                foreignKey: "game_id",
                as: "right_price_rounds",
            });
        }
    }
    Games.init({
        user_id: DataTypes.INTEGER,
        current_progress: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        is_finished: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    }, {
        sequelize,
        modelName: "Game",
        createdAt: "created_at",
        updatedAt: "updated_at",
    });
    return Games;
};
