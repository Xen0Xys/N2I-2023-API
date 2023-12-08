/* eslint-disable no-unused-vars */
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class QuizRounds extends Model{
        static associate(models){
            QuizRounds.belongsTo(models.Game, {
                foreignKey: "game_id",
                as: "game",
            });
            QuizRounds.belongsTo(models.QuizData, {
                foreignKey: "quiz_data_id",
                as: "quiz_data",
            });
        }
    }
    QuizRounds.init({
        game_id: DataTypes.INTEGER,
        quiz_data_id: DataTypes.INTEGER,
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
        modelName: "QuizRounds",
        createdAt: "created_at",
        updatedAt: "updated_at",
    });
    return QuizRounds;
};
