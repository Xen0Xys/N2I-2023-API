/* eslint-disable no-unused-vars */
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class quiz_data extends Model{
        static associate(models){

        }
    }
    quiz_data.init({
        image: DataTypes.STRING,
        question: DataTypes.STRING,
        right_answer: DataTypes.STRING,
        wrong_answer_1: DataTypes.STRING,
        wrong_answer_2: DataTypes.STRING,
        wrong_answer_3: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "QuizData",
        createdAt: "created_at",
        updatedAt: "updated_at",
    });
    return quiz_data;
};
