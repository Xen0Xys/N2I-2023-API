/* eslint-disable no-unused-vars */
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class InfoData extends Model{
        static associate(models){
            InfoData.hasMany(models.InfoRounds, {
                foreignKey: "info_data_id",
            });
        }
    }
    InfoData.init({
        type: DataTypes.STRING,
        url: DataTypes.STRING,
        title: DataTypes.STRING,
        content: DataTypes.STRING,
    }, {
        sequelize,
        modelName: "InfoData",
        tableName: "info_data",
        createdAt: "created_at",
        updatedAt: "updated_at",
    });
    return InfoData;
};
