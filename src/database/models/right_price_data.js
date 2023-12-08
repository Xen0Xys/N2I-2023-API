/* eslint-disable no-unused-vars */
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class RightPriceData extends Model{
        static associate(models){
            RightPriceData.hasMany(models.RightPriceRounds, {
                foreignKey: "right_price_data_id",
                as: "right_price_rounds",
            });
        }
    }
    RightPriceData.init({
        image: DataTypes.STRING,
        question: DataTypes.STRING,
        answer: DataTypes.INTEGER,
        order_of_magnitude: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: "RightPriceData",
        createdAt: "created_at",
        updatedAt: "updated_at",
    });
    return RightPriceData;
};
