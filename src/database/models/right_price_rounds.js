/* eslint-disable no-unused-vars */
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class RightPriceRounds extends Model{
        static associate(models){
            RightPriceRounds.belongsTo(models.Game, {
                foreignKey: "game_id",
                as: "game",
            });
            RightPriceRounds.belongsTo(models.RightPriceData, {
                foreignKey: "right_price_data_id",
                as: "right_price_data",
            });
        }
    }
    RightPriceRounds.init({
        game_id: DataTypes.INTEGER,
        right_price_data_id: DataTypes.INTEGER,
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
        modelName: "RightPriceRounds",
        tableName: "right_price_rounds",
        createdAt: "created_at",
        updatedAt: "updated_at",
    });
    return RightPriceRounds;
};
