/* eslint-disable no-unused-vars */
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class InfoData extends Model{
        static associate(models){

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
        createdAt: "created_at",
        updatedAt: "updated_at",
    });
    return InfoData;
};
