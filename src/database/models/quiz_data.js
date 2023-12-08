/* eslint-disable no-unused-vars */
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class QuizData extends Model{
        static associate(models){
            QuizData.hasMany(models.QuizRounds, {
                foreignKey: "quiz_data_id",
                as: "quiz_rounds",
            });
        }
    }
    QuizData.init({
        image: DataTypes.STRING,
        question: DataTypes.STRING,
        right_answer: DataTypes.STRING,
        wrong_answer_1: DataTypes.STRING,
        wrong_answer_2: DataTypes.STRING,
        wrong_answer_3: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "QuizData",
        tableName: "quiz_data",
        createdAt: "created_at",
        updatedAt: "updated_at",
    });
    return QuizData;
};
