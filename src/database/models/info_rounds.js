/* eslint-disable no-unused-vars */
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class InfoRounds extends Model{
        static associate(models){
            InfoRounds.belongsTo(models.Game, {
                foreignKey: "game_id",
            });
            InfoRounds.belongsTo(models.InfoData, {
                foreignKey: "info_data_id",
            });
        }
    }
    InfoRounds.init({
        game_id: DataTypes.INTEGER,
        info_data_id: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: "InfoRounds",
        tableName: "info_rounds",
        createdAt: "created_at",
        updatedAt: "updated_at",
    });
    return InfoRounds;
};
